const User = require('mongoose').model('User')
const annotatedTweet = require('mongoose').model('annotatedTweet')

module.exports = {
    async getUsers (req,res) {
        try {  
            const users = await User.find().exec()
            res.send (users)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch users"
            })
        }
    },
    async getAnnotated (req,res) {
        try {  
            const categories = req.headers.categories.split(',')
            .map(item => item == 0 ? 'Race' : item == 1 ? 'Sexuality' : item == 2 ? 'Ethnicity' : item == 3 ? 'Religion' : item == 4 ? 'Gender' : 'Disability')
            var tweets = []
            for (let i in categories) {
                tweets.push(...(await annotatedTweet.find({category: categories[i]}).exec()))
            }
            res.send (tweets)
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch users"
            })
        }
    },
    async getTrends (req,res) {
        try {  
            const categories = req.headers.categories.split(',')
            .map(item => item == 0 ? 'Race' : item == 1 ? 'Sexuality' : item == 2 ? 'Ethnicity' : item == 3 ? 'Religion' : item == 4 ? 'Gender' : 'Disability')
            var tweets = []
            if (req.headers.monthly == 'true') {
                const date = new Date();
                for (let i= 0; i<7; i++) {
                    let monthlyTweets = []
                    for (let j in categories) {
                        let begindate = new Date(date.getFullYear(), date.getMonth()-i, 1)
                        let enddate = new Date(date.getFullYear(), date.getMonth()+1-i, 0)
                        monthlyTweets.push(...(await annotatedTweet.find({
                            category: categories[j],
                            created_at: { $gt: begindate, $lte: enddate }})
                            .exec()))
                    }
                    tweets.push(monthlyTweets)
                }
            } else {
                for (let i= 0; i<7; i++) {
                    const date = new Date()
                    let begindate = new Date(new Date(date.setDate(date. getDate()-i)).setHours(0,0,0,0))
                    let enddate = new Date(new Date(date.setDate(date. getDate()+1)).setHours(0,0,0,0))
                    let monthlyTweets = []
                    for (let j in categories) {
                        monthlyTweets.push(...(await annotatedTweet.find({
                            category: categories[j],
                            created_at: { $gte: begindate, $lt: enddate}})
                            .exec()))
                    }
                    tweets.push(monthlyTweets)
                }
            }   
            res.send (tweets) 
        } catch (err){
            console.log(err)
            res.status(500).send({
                error: "Couldn't fetch trends"
            })
        }
    },
}