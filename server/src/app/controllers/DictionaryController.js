const Dictionary = require('mongoose').model('Dictionary')

module.exports = {

    async getDicts (req,res) {
        try {
            const dicts = await Dictionary.find().exec()
            res.send(dicts)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch dicts"
            })
        }
    },
}