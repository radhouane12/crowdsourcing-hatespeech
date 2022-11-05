const FlagController = require('../controllers/FlagController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/API/flags/index", verifyToken.authenticate, FlagController.getFlagged)  
    app.post("/API/flags/:id/:action", verifyToken.authenticate, FlagController.removeFlag)  
}