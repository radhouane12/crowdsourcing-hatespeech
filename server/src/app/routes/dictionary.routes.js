const DictionaryController = require('../controllers/DictionaryController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/dicts",verifyToken.authenticate, DictionaryController.getDicts)  
    app.get("/suggs",verifyToken.authenticate, DictionaryController.getSuggs) 
    app.post("/dicts",verifyToken.authenticate, DictionaryController.addTerm)
    app.post("/suggs",verifyToken.authenticate, DictionaryController.addSuggestion) 
    app.post("/suggs/add",verifyToken.authenticate, DictionaryController.addSuggToDict) 
    app.delete("/suggs/delete",verifyToken.authenticate, DictionaryController.deleteSugg) 
}