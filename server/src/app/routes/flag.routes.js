const FlagController = require('../controllers/FlagController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/flags/index", verifyToken.authenticate, FlagController.getFlagged)  
    app.post("/flags/:id/:action", verifyToken.authenticate, FlagController.removeFlag)  
}