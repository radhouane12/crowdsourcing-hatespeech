const AnnotationController = require('../controllers/AnnotationController')
const verifyToken = require('../utils/VerifyToken')



module.exports = (app) => {
    app.get("/annotation", verifyToken.authenticate, AnnotationController.index)    
    app.post("/getOne", verifyToken.authenticate, AnnotationController.getOne)
    app.post("/skipTweet", verifyToken.authenticate, AnnotationController.skipTweet)
    app.post("/getFiltered", verifyToken.authenticate, AnnotationController.getFiltered)
    app.post("/flagTweet", verifyToken.authenticate, AnnotationController.flagTweet)
    app.post("/addCategory", verifyToken.authenticate, AnnotationController.addCategory)
    app.post("/labelTweet", verifyToken.authenticate, AnnotationController.labelTweet)
}