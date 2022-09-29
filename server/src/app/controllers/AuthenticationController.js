const User=require('mongoose').model('User');
const jwt = require ('jsonwebtoken')
const config = require('../../config/config')

function jwtSignUser (user) {
    const ONE_WEEK = 60*60*24*7
    return jwt.sign (user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req,res) {
        try {
            const user = await User.create(req.body) 
            res.send(user.toJSON())
        } catch (err){
            res.status(400).send({
                error: "this email account is already in use"
            })
        }
          
    },
    async login (req,res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({
                    email: email
            })
            
            if (!user) {
                return res.status(403)({
                    error: 'The login info was incorrect'
                })
            }
            const isPasswordValid = password === user.password
            if (!isPasswordValid) {
                return res.status(403).send({
                    error: 'login info was incorrect'
                })
            }
            const userJson = user.toJSON()
            res.send ({
                user:userJson,
                token: jwtSignUser(userJson)
            })
        } catch (err){
            res.status(500).send({
                error: "login failed"
            })
        }
          
    }
}