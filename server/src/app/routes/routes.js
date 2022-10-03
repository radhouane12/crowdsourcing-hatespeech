const AuthenticationController = require ('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require ('../utils/AuthenticationControllerPolicy')
const AnnotationController = require ('../controllers/AnnotationController')
const verifyToken = require ('../utils/VerifyToken')

module.exports = (app) => {
    app.post("/register", 
    AuthenticationControllerPolicy.register,
    AuthenticationController.register)

    app.post("/login",
    AuthenticationControllerPolicy.login,
    AuthenticationController.login)

    app.get("/annotation",
    verifyToken.authenticate,
    AnnotationController.index)

    app.post("/logout",
    AuthenticationController.logout)
    
    app.post("/getNewToken",
    AuthenticationController.getNewToken)
}