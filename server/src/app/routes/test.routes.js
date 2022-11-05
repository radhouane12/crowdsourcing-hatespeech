const TestController = require('../controllers/TestController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.post("/API/makeExpert", verifyToken.authenticate, TestController.makeExpert)    

}