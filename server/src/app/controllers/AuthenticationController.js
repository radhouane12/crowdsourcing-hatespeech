const RefreshToken = require('mongoose').model('RefreshToken')
const User = require('mongoose').model('User')
const jwt = require ('jsonwebtoken')
const bcrypt = require ('bcrypt')


//create JWT Token
function createAccessToken (user) {
    const HALF_HOUR = 60*30
    return jwt.sign ({ user, exp: Math.floor(Date.now() / 1000) + HALF_HOUR}, process.env.JWT_SECRET_ACCESS)
}
function createRefreshToken (user) {
    return jwt.sign (user, process.env.JWT_SECRET_REFRESH)
}

module.exports = {
    async register (req,res) {
        try {
            //Hash password and create user
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const user = new User({
                email: req.body.email,
                password: hashedPassword
            })
            const savedUser = (await (user.save())).toJSON()
            //create tokens
            const accessToken = createAccessToken(savedUser)
            const refreshToken = createRefreshToken(savedUser)
            //save refreshtoken in DB
            const tokenRecord = new RefreshToken({
                token: refreshToken,
                createdAt: Date.now()
            })
            await tokenRecord.save()
            //respond with id and tokens
            res.json({ accessToken: accessToken, refreshToken: refreshToken, user: savedUser._id })
        } catch (err){
            res.status(400).send({
                error: "this email account is already in use"
            })
        }
          
    },
    async login (req,res) {
        try {
            const {email, password} = req.body
            //check if user exists
            const user = await User.findOne({
                    email: email
            })
            if (!user) {
                return res.status(403)({
                    error: 'The login info was incorrect'
                })
            }
            //Validate password 
            const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'The login info was incorrect'
                })
            }
            const userJson = user.toJSON()
            //create tokens
            const accessToken = createAccessToken(userJson)
            const refreshToken = createRefreshToken(userJson)
            //save refreshtoken in DB
            const tokenRecord = new RefreshToken({
                token: refreshToken,
                createdAt: Date.now()
            })
            await tokenRecord.save()
            //respond with id and tokens
            res.json({ accessToken: accessToken, refreshToken: refreshToken, user: userJson._id })
        } catch (err){
            res.status(500).send({
                error: "login failed"
            })
        }
    },
    async logout (req,res) {
        try {
            const token= req.body.token
            await RefreshToken.deleteOne({
                token: token
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
            const refreshToken = await RefreshToken.findOne({
                token: receivedToken
            })
            if (!refreshToken) {
                console.log("forbidden because not found")
                return res.sendStatus(403)
            }
            try {
                jwt.verify(receivedToken, process.env.JWT_SECRET_REFRESH, (err, user) => {
                    if (err) {
                        console.log("forbidden because not verified")
                        return res.sendStatus(403)
                    }
                    const accessToken = createAccessToken (user)
                    res.json({ accessToken: accessToken})
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

