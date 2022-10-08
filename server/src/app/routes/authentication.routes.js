const AuthenticationController = require ('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require ('../utils/AuthenticationControllerPolicy')


module.exports = (app) => {
    app.post("/register", AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post("/login", AuthenticationControllerPolicy.login, AuthenticationController.login)
    app.post("/logout", AuthenticationController.logout)    
    app.post("/getNewToken", AuthenticationController.getNewToken)
}