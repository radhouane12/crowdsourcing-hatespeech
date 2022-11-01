const AnnotationController = require('../controllers/AnnotationController')
const verifyToken = require('../utils/VerifyToken')



module.exports = (app) => {
    app.get("/tweet/index", verifyToken.authenticate, AnnotationController.index)    
    app.post("/tweet/:id/:action", verifyToken.authenticate, AnnotationController.editTweet)
}