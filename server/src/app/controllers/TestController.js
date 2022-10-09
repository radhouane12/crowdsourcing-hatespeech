const User = require('mongoose').model('User')

module.exports = {
    async makeExpert (req,res) {
        try {

            await User.findOneAndUpdate({_id : req.headers.user},  { $set : {isExpert : true}})
            res.send("User is now an expert")
        } catch (err){
            res.status(500).send({
                error: "Couldnt make user expert"
            })
        }
          
    }
}