const Tweet = require('mongoose').model('Tweet')
const AnnotatedTweet = require('mongoose').model('annotatedTweet')

module.exports = {
    async index(req, res) {
        try {
            var tweets = []
            let i = 4
            while (tweets.length < req.headers.indexlength) {
                tweets.push(...(await Tweet.find({ annotators: { $ne: req.headers.user }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                i--
            }
            tweets = tweets.sort(() => 0.5 - Math.random())
            tweets = tweets.slice(0,req.headers.indexlength)
            res.send(tweets)
        } catch (err) {
            res.status(500).send({
                error: "Couldn't fetch tweets"
            })
        }
    },
    async getOne(req, res) {
        try {
            const categories = req.body.categories.map(item => item == 0 ? 'Gender' : item == 1 ? 'Disability' : item == 2 ? 'Race' : item == 3 ? 'Religion' : item == 4 ? 'Ethnicity' : 'Sexuality')
            var tweets = []
            let i = 4
            while (tweets.length < 1) { 
                tweets.push(...(await Tweet.find({ annotators: { $ne: req.headers.user }, _id: { $nin: req.body.alreadyViewed }, created_at: { "$gte": req.body.date }, category: { $in: categories }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                i--
            }
            tweets = tweets.sort(() => 0.5 - Math.random())
            res.send(tweets[0])
        } catch (err) {
            res.status(500).send({
                error: "Couldn't fetch tweet"
            })
        }
    },
    async skipTweet(req, res) {
        try {
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $push: { annotators: req.body.user } })
            res.send("tweet updated")
        } catch (err) {
            res.status(500).send({
                error: "Couldn't update Annotators"
            })
        }
    },
    async getFiltered(req, res) {
        try {
            const categories = req.body.categories.map(item => item == 0 ? 'Gender' : item == 1 ? 'Disability' : item == 2 ? 'Race' : item == 3 ? 'Religion' : item == 4 ? 'Ethnicity' : 'Sexuality')
            var tweets = []
            let i = 4
            while (tweets.length < req.body.len) {
                tweets.push(...(await Tweet.find({ annotators: { $ne: req.body.user }, created_at: { "$gte": req.body.date }, category: { $in: categories }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                i--
            }
            tweets = tweets.sort(() => 0.5 - Math.random())
            tweets = tweets.slice(0,req.body.len)
            res.send(tweets)
        } catch (err) {
            res.status(500).send({
                error: "Couldn't fetch filtered tweets"
            })
        }
    },
    async flagTweet(req, res) {
        try {
            await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $set: { flag: req.body.flag } })
            res.send("tweet flagged")
        } catch (err) {
            res.status(500).send({
                error: "Couldn't flag tweet"
            })
        }
    },
    async addCategory(req, res) {
        try {
            let updatedVersion = await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $addToSet: { category: req.body.newCategory } }, { new: true })
            res.send(updatedVersion)
        } catch (err) {
            res.status(500).send({
                error: "Couldn't add category"
            })
        }
    },
    async labelTweet(req, res) {
        try {
            let updatedtweet = await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $push: { annotators: req.body.user, labels: { $each: req.body.labels } }, $inc: { numberOfAnnotations: 1 } }, {
                new: true
            })
            if (req.headers.isexpert == "true") {
                updatedtweet = await Tweet.findOneAndUpdate({ _id: req.body.tweetId }, { $push: { labels: { $each: req.body.labels } }, $inc: { numberOfAnnotations: 1 } }, {
                    new: true
                })
            }
            if (updatedtweet.numberOfAnnotations >= 5) {
                let trackObj = {}
                updatedtweet.labels.forEach(cur => {
                    if (!trackObj[cur])
                        trackObj[cur]= 1
                    else
                        trackObj[cur]++;
                });
                let maxOccurence = Math.max(...(Object.values(trackObj)))
                const finalLabels = Object.keys(trackObj).filter(key => trackObj[key] === maxOccurence);
                let newAnnotatedTweet = new AnnotatedTweet ({
                    tweet:updatedtweet.tweet,
                    created_at:updatedtweet.created_at,
                    category:updatedtweet.category,
                    finalLabels: finalLabels,
                    annotators:updatedtweet.annotators,
                })
                await newAnnotatedTweet.save()
            }
            res.send("tweet labeled")
        } catch (err) {
            res.status(500).send({
                error: "Couldn't add Labels"
            })
        }
    },
}