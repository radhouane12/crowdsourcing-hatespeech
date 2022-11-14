const User = require('mongoose').model('User')

module.exports = {
    async makeExpert(req, res) {
        try {
            let userID = req.user.user._id
            if (typeof req.user.user._id === 'undefined') {
                userID = req.user.user.user._id
            }
            await User.findOneAndUpdate({ _id: req.user.user._id }, { $set: { isExpert: true } })
            res.send("User is now an expert")
        } catch (err) {
            res.status(500).send({
                error: "Couldnt make user expert"
            })
        }

    }
}