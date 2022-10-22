const StatisticsController = require('../controllers/StatisticsController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/getUsers",verifyToken.authenticate, StatisticsController.getUsers)  
    app.get("/getAnnotated",verifyToken.authenticate, StatisticsController.getAnnotated) 
    app.get("/getTrends",verifyToken.authenticate, StatisticsController.getTrends)  
}