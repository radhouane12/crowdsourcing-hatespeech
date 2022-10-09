const TestController = require('../controllers/TestController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.post("/makeExpert", verifyToken.authenticate, TestController.makeExpert)    

}