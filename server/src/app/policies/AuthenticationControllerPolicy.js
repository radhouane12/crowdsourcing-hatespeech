const Joi = require('joi')

module.exports = {
    register (req, res, next) {
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
    }
}