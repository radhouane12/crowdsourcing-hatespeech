const RefreshToken = require('mongoose').model('RefreshToken')
const User = require('mongoose').model('User')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')


//create JWT Token
function createAccessToken (user) {
    const ONE_HOUR =60*60
    return jwt.sign ({ user, exp: Math.floor(Date.now() / 1000) + ONE_HOUR}, process.env.JWT_SECRET_ACCESS)
}
function createRefreshToken (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign ({ user, exp: Math.floor(Date.now() / 1000) + ONE_WEEK}, process.env.JWT_SECRET_REFRESH)
}

module.exports = {
    async register (req,res) {
        try {
            //Hash password and create user
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                username: req.body.username,
                password: hashedPassword,
                gender: req.body.gender,
                age: req.body.age,
                profession: req.body.profession,
                annualIncome: req.body.annualIncome,
                education: req.body.education,
                nationality: req.body.nationality,
                residence: req.body.residence,
                isExpert: req.body.isExpert,
            })
            const savedUser = (await (user.save())).toJSON()
            //create tokens
            const accessToken = createAccessToken(savedUser)
            const refreshToken = createRefreshToken(savedUser)
            //save refreshtoken in DB
            const tokenRecord = new RefreshToken({
                tokenFamily: [refreshToken],
            })
            await tokenRecord.save()
            //respond with id and tokens
            res.json({ accessToken: accessToken, refreshToken: refreshToken, user: savedUser})
        } catch (err){
            res.status(400).send({
                error: "this email account is already in use"
            })
        }
          
    },
    async login (req,res) {
        try {
            const {username, password} = req.body
            //check if user exists
            const user = await User.findOne({
                username: username
            }) 
            if (!user) {
                res.status(403).send({
                    error: "This username Doesn't exist"
                })
                return
            }  
            //Validate password 
            const isPasswordValid = await bcrypt.compare(password, user.password)
            if (!isPasswordValid) {
                res.status(403).send({
                    error: 'Incorrect Password'
                })
                return
            }
            const userJson = user.toJSON()
            //create tokens
            const accessToken = createAccessToken(userJson)
            const refreshToken = createRefreshToken(userJson)
            //save refreshtoken in DB
            const tokenRecord = new RefreshToken({
                tokenFamily: [refreshToken],
            })
            await tokenRecord.save()
            //respond with id and tokens
            res.json({ accessToken: accessToken, refreshToken: refreshToken, user: userJson})
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "login failed"
            })
        }
    },
    async logout (req,res) {
        try {
            const token= req.body.token
            await RefreshToken.deleteOne({
                tokenFamily: token
            })
            res.sendStatus(204)
        } catch (err){
            res.status(500).send({
                error: "logout failed"
            })
        }
    },
    async getNewToken (req,res) {
        try {
            const receivedToken= req.body.token        
            if (receivedToken == null) return res.sendStatus(401)
            const refreshTokenFamily = await RefreshToken.findOne({
                tokenFamily: receivedToken
            })
            if (!refreshTokenFamily) {
                console.log("forbidden: token not found")
                return res.sendStatus(403)
            }    
            try {
                if (refreshTokenFamily.tokenFamily.indexOf(receivedToken) != refreshTokenFamily.tokenFamily.length -1) {
                    console.log("forbidden: token already used, potentially an attacker")
                    await RefreshToken.findOneAndDelete({
                        tokenFamily: receivedToken
                    })
                    return res.sendStatus(403)
                }
                jwt.verify(receivedToken, process.env.JWT_SECRET_REFRESH, async (err, user) => {
                    if (err) {
                        console.log("forbidden: token couldn't get verified")
                        await RefreshToken.findOneAndDelete({
                            tokenFamily: receivedToken
                        })
                        return res.sendStatus(403)
                    }
                    const accessToken = createAccessToken (user)
                    const refreshToken = createRefreshToken(user)
                    await RefreshToken.findOneAndUpdate(
                        {tokenFamily: receivedToken},
                        {$push: {tokenFamily: refreshToken}}
                    )
                    console.log (6) 
                    res.json({ accessToken: accessToken, refreshToken: refreshToken})
                })   
            } catch(error){
                res.status(401).send('Invalid Refresh Token' + error)
            }
        } catch (err){
            res.status(500).send({
                error: "couldn't refresh Token"
            })
        }
    }
}

