const AuthenticationController = require ('../controllers/AuthenticationController')
const AuthenticationControllerPolicy = require ('../utils/AuthenticationControllerPolicy')


module.exports = (app) => {
    app.post("/API/register", AuthenticationControllerPolicy.register, AuthenticationController.register)
    app.post("/API/login", AuthenticationControllerPolicy.login, AuthenticationController.login)
    app.post("/API/logout", AuthenticationController.logout)    
    app.post("/API/getNewToken", AuthenticationController.getNewToken)
}