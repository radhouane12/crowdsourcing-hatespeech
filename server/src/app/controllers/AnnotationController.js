const Tweet = require('mongoose').model('Tweet')

module.exports = {
    //async when adding promise call to db
    async index (req,res) {
        try {          
            res.send (
                //to be changed to list tweets ? think about how to do it in terms of how much data will we be sending 
                [{
                    "_id": 1571981878004940802,
                    "created_at": "2022-09-19 23:57:40 CEST",
                    "tweet": "@Emohjify Aliens and or information that would cripple religious beliefs being withheld by some government somewhere"
                }],
            )
        } catch (err){
            res.status(500).send({
                error: "Couldn't fetch tweets"
            })
        }
    }
}