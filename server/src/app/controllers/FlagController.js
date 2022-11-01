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
    async removeFlag (req,res) {
        const action = req.params.action     
        switch (action) {
            case 'keep':
                try {
                    if (!req.user.user.user.isExpert) res.status(403).send({ error: "User is not allowed to do this action" })
                    const kept =  await Tweet.findByIdAndUpdate(req.params.id, { $unset : { flag : 1} })
                    res.send(kept)
                } catch (err){
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't update tweet state"
                    })
                }
                break;
            case 'delete':
                try {
                    if (!req.user.user.user.isExpert) res.status(403).send({ error: "User is not allowed to do this action" })
                    const deleted = await Tweet.findByIdAndDelete(req.params.id)
                    res.send(deleted)
                } catch (err){
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't delete tweet"
                    })
                }
                break;
            default:
                res.status(404).send("action not recognised")
        }
    },
}