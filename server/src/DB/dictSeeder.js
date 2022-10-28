const Dictionary = require('mongoose').model('Dictionary')
module.exports = async () => {
    const dicts = await Dictionary.find()
    if (dicts.length !== 0) {
        return
    }
    const dict = require('../DB/initialDict.json')
        
    dict.forEach(async function (item) {
        var dictionary = new Dictionary(item)
        await dictionary.save() 
    })
}