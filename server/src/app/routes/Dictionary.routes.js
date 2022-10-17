const DictionaryController = require('../controllers/DictionaryController')
const verifyToken = require('../utils/VerifyToken')

module.exports = (app) => {
    app.get("/getDicts",verifyToken.authenticate, DictionaryController.getDicts)  
    app.get("/getSuggs",verifyToken.authenticate, DictionaryController.getSuggs) 
    app.post("/addTerm",verifyToken.authenticate, DictionaryController.addTerm) 
    app.post("/addSuggestion",verifyToken.authenticate, DictionaryController.addSuggestion) 
    app.post("/addSuggToDict",verifyToken.authenticate, DictionaryController.addSuggToDict) 
    app.delete("/deleteSugg",verifyToken.authenticate, DictionaryController.deleteSugg) 
}