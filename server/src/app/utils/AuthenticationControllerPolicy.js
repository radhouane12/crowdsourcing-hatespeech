const Joi = require('joi')
const User=require('mongoose').model('User');

module.exports = {
    async register (req, res, next) {
        const usernameExists = await User.findOne({username: req.body.username})
        if (usernameExists) return res.status(400).send ({error : 'Username already exists'})
        next()
    },
    async login (req, res, next) {
        next()
    }
}