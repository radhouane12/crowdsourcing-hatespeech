const DictionaryController = require('../controllers/DictionaryController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/API/dicts",verifyToken.authenticate, DictionaryController.getDicts)  
    app.get("/API/suggs",verifyToken.authenticate, DictionaryController.getSuggs) 
    app.post("/API/dicts",verifyToken.authenticate, DictionaryController.addTerm)
    app.post("/API/suggs",verifyToken.authenticate, DictionaryController.addSuggestion) 
    app.post("/API/suggs/add",verifyToken.authenticate, DictionaryController.addSuggToDict) 
    app.delete("/API/suggs/delete",verifyToken.authenticate, DictionaryController.deleteSugg) 
}