const AnnotationController = require('../controllers/AnnotationController')
const verifyToken = require('../utils/VerifyToken')



module.exports = (app) => {
    app.get("/index", verifyToken.authenticate, AnnotationController.index)    
    app.post("/skipTweet", verifyToken.authenticate, AnnotationController.skipTweet)
    app.post("/flagTweet", verifyToken.authenticate, AnnotationController.flagTweet)
    app.post("/addCategory", verifyToken.authenticate, AnnotationController.addCategory)
    app.post("/labelTweet", verifyToken.authenticate, AnnotationController.labelTweet)
}