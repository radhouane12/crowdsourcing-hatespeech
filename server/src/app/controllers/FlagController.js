const Tweet = require('mongoose').model('Tweet')

module.exports = {

    async getFlagged (req,res) {
        try {
            const tweets = await Tweet.find({flag: { $exists:true }}).exec()
            res.send (tweets)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch flagged tweets"
            })
        }
    },
    async keepTweet (req,res) {
        try {
            const kept =  await Tweet.findByIdAndUpdate(req.body.id, { $unset : { flag : 1} })
            res.send(kept)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't update tweet state"
            })
        }
    },
    async deleteTweet (req,res) {
        try {
            const deleted = await Tweet.findByIdAndDelete(req.body.id)
            res.send(deleted)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't delete tweet"
            })
        }
    }
}