const AnnotationController = require('../controllers/AnnotationController')
const verifyToken = require('../utils/VerifyToken')



module.exports = (app) => {
    app.get("/API/tweet/index", verifyToken.authenticate, AnnotationController.index)    
    app.post("/API/tweet/:id/:action", verifyToken.authenticate, AnnotationController.editTweet)
}