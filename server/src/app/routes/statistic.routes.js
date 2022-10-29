const StatisticsController = require('../controllers/StatisticsController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/getStats",verifyToken.authenticate, StatisticsController.getStats)
}