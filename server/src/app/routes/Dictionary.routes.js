const DictionaryController = require('../controllers/DictionaryController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/getDicts", DictionaryController.getDicts)  
}