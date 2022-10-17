const Dictionary = require('mongoose').model('Dictionary')
const Suggestion = require('mongoose').model('Suggestion')

module.exports = {
    async getDicts(req, res) {
        try {
            const dicts = await Dictionary.find().exec()
            res.send(dicts)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch dicts"
            })
        }
    },
    async getSuggs(req, res) {
        try {
            const Suggs = await Suggestion.find().exec()
            res.send(Suggs)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch suggs"
            })
        }
    },
    async addTerm(req, res) {
        try {
            const newTerm = new Dictionary(req.body)
            await newTerm.save()
            res.send("term added")
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't add term"
            })
        }
    },
    async addSuggestion(req, res) {
        try {
            const exists = await Dictionary.find({ term: req.body.term })
            if (exists.length > 0) {
                res.send("Term is already in dictionary")
            } else {
                const suggestion = new Suggestion(req.body)
                await suggestion.save()
                res.send("suggestion added")
            }
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't add suggestion"
            })
        }
    },
    async addSuggToDict(req, res) {
        try {
            await Suggestion.findOneAndDelete({term: req.body.term})
            const newTerm = new Dictionary({term: req.body.term, category:req.body.category})
            await newTerm.save()
            res.send("term added")
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't add suggestion"
            })
        }
    },
    async deleteSugg(req, res) {
        try {
            const deleted = await Suggestion.findOneAndDelete({term: req.body.term})
            res.send(deleted)
        } catch (err) {
            console.log(err)
            res.status(500).send({
                error: "Couldn't add suggestion"
            })
        }
    },
}