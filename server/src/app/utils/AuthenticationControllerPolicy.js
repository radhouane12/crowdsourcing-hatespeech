const Joi = require('joi')
const User=require('mongoose').model('User');

module.exports = {
    async register (req, res, next) {
        const emailExist = await User.findOne({email: req.body.email})
        if (emailExist) return res.status(400).send ({error : 'email already exists'})
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}')
            )
        })
        const validation = schema.validate (req.body)
        if (validation.error) {
            switch(validation.error.details[0].context.key) {
                case 'email':
                    res.status(400).send({
                        error: "email invalid"
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: "password invalid"
                    })
                    break
                default:
                    res.status(400).send({
                        error: 'invalid registration info'
                    })
                }
        }else {
            next()
        }
    },
    async login (req, res, next) {
        next()
    }
}