const Tweet = require('mongoose').model('Tweet')
const AnnotatedTweet = require('mongoose').model('annotatedTweet')

module.exports = {
    async index(req, res) {
        const query = JSON.parse(req.query.query)
        switch (query.type) {
            case 'normal':
                try {
                    var tweets = []
                    let i = 4
                    while (tweets.length < query.filterLength) {
                        tweets.push(...(await Tweet.find({ annotators: { $ne: query.user }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                        i--
                    }
                    tweets = tweets.sort(() => 0.5 - Math.random())
                    tweets = tweets.slice(0, query.filterLength)
                    res.send(tweets)
                } catch (err) {
                    res.status(500).send({
                        error: "Couldn't fetch tweets"
                    })
                }
                break;
            case 'single':
                try {
                    const categories = query.categories.map(item => item == 0 ? 'Gender' : item == 1 ? 'Disability' : item == 2 ? 'Race' : item == 3 ? 'Religion' : item == 4 ? 'Ethnicity' : 'Sexuality')
                    var tweets = []
                    let i = 4
                    while (tweets.length < 1) {
                        tweets.push(...(await Tweet.find({ annotators: { $ne: query.user }, _id: { $nin: query.alreadyViewed }, created_at: { "$gte": query.date }, category: { $in: categories }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                        i--
                    }
                    tweets = tweets.sort(() => 0.5 - Math.random())
                    res.send(tweets[0])
                } catch (err) {
                    res.status(500).send({
                        error: "Couldn't fetch tweet"
                    })
                }
                break;
            case 'filtered':
                try {
                    const categories = query.categories.map(item => item == 0 ? 'Gender' : item == 1 ? 'Disability' : item == 2 ? 'Race' : item == 3 ? 'Religion' : item == 4 ? 'Ethnicity' : 'Sexuality')
                    var tweets = []
                    let i = 4
                    while (tweets.length < query.filterLength) {
                        tweets.push(...(await Tweet.find({ annotators: { $ne: query.user }, created_at: { "$gte": query.date }, category: { $in: categories }, numberOfAnnotations: { $eq: i }, flag: { $exists: false } }).exec()))
                        i--
                    }
                    tweets = tweets.sort(() => 0.5 - Math.random())
                    tweets = tweets.slice(0, query.filterLength)
                    res.send(tweets)
                } catch (err) {
                    res.status(500).send({
                        error: "Couldn't fetch filtered tweets"
                    })
                }
                break;
            default:
                res.status(404).send("not found")
        }
    },
    async editTweet(req, res) {
        const action = req.params.action    
        switch (action) {
            case 'skip':
                try {
                    await Tweet.findOneAndUpdate({ _id: req.params.id }, { $push: { annotators: req.user.user._id } })
                    res.send("tweet updated")
                } catch (err) {
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't update Annotators"
                    })
                }
                break;
            case 'addCategory':
                try {
                    if (!req.user.user.isExpert) res.status(403).send({ error: "User is not allowed to do this action" })
                    let updatedVersion = await Tweet.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { category: req.body.data } }, { new: true })
                    res.send(updatedVersion)
                } catch (err) {
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't add category"
                    })
                }
                break;
            case 'flag':
                try {
                    await Tweet.findOneAndUpdate({ _id: req.params.id }, { $set: { flag: req.body.data } })
                    res.send("tweet flagged")
                } catch (err) {
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't flag tweet"
                    })
                }
                break;
            case 'label':
                try {
                    let updatedtweet = await Tweet.findOneAndUpdate({ _id: req.params.id },
                        { $push: { annotators: req.user.user._id, labels: { $each: req.body.data } },
                        $inc: { numberOfAnnotations: 1 } },
                        {new: true}
                    )
                    if (req.user.user.isExpert) {
                        updatedtweet = await Tweet.findOneAndUpdate({ _id: req.params.id }, 
                            { $push: { labels: { $each: req.body.data } }, 
                            $inc: { numberOfAnnotations: 1 } }, 
                            {new: true}
                        )
                    }
                    if (updatedtweet.numberOfAnnotations >= 5) {
                        let trackObj = {}
                        updatedtweet.labels.forEach(cur => {
                            if (!trackObj[cur])
                                trackObj[cur] = 1
                            else
                                trackObj[cur]++;
                        });
                        let maxOccurence = Math.max(...(Object.values(trackObj)))
                        const finalLabels = Object.keys(trackObj).filter(key => trackObj[key] === maxOccurence);
                        let newAnnotatedTweet = new AnnotatedTweet({
                            tweet: updatedtweet.tweet,
                            created_at: updatedtweet.created_at,
                            category: updatedtweet.category,
                            finalLabels: finalLabels,
                            annotators: updatedtweet.annotators,
                        })
                        await newAnnotatedTweet.save()
                    }
                    res.send("tweet labeled")
                } catch (err) {
                    console.log(err)
                    res.status(500).send({
                        error: "Couldn't add Labels"
                    })
                }
                break;
            default:
                res.status(404).send("action not recognised")
        }
    },
}