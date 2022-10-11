const FlagController = require('../controllers/FlagController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/getFlagged", verifyToken.authenticate, FlagController.getFlagged)  
    app.post("/keepTweet", verifyToken.authenticate, FlagController.keepTweet)  
    app.delete("/deleteTweet",verifyToken.authenticate, FlagController.deleteTweet)    

}