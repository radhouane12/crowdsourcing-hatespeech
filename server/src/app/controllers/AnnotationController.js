const Tweet = require('mongoose').model('Tweet')

module.exports = {
    //async when adding promise call to db
    async index (req,res) {
        try {  
            const tweets = await Tweet.find({ annotators : {$ne : req.headers.user}}, null, { sort: { created_at: -1 }}).limit(req.headers.indexlength).exec()
            res.send (tweets)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch tweets"
            })
        }
    },
    async getOne (req,res) {
        try {  
            const categories = req.body.categories.map(item=> item==0 ? 'Gender' : item==1 ? 'Disability' : item==2 ? 'Race' :item==3 ? 'Religion' :item==4 ? 'Ethnicity' : 'Sexuality')
            const tweet = await Tweet.findOne({ annotators : {$ne : req.headers.user}, created_at :{"$gte": req.body.date}, category: {$in : categories}}, null, { sort: { created_at: -1 }}).skip(req.headers.skipnumber).exec()
            res.send (tweet)
        } catch (err){
            res.status(500).send({
                error: "Couldn't fetch tweet"
            })
        }
    },
    async skipTweet (req,res) {
        try {  
            await Tweet.findOneAndUpdate({_id : req.body.tweetId},  { $push : {annotators : req.body.user}})
            res.send("tweet updated")
        } catch (err){
            res.status(500).send({
                error: "Couldn't update Annotators"
            })
        }
    },
    async getFiltered (req,res) {
        try {
            const categories = req.body.categories.map(item=> item==0 ? 'Gender' : item==1 ? 'Disability' : item==2 ? 'Race' :item==3 ? 'Religion' :item==4 ? 'Ethnicity' : 'Sexuality')
            const tweets = await Tweet.find({annotators : {$ne : req.body.user}, created_at :{"$gte": req.body.date}, category: {$in : categories}}, null, { sort: { created_at: -1 }}).limit(req.body.len).exec()
            res.send (tweets)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch filtered tweets"
            })
        }
    },
}