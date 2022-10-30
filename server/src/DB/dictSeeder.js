const Dictionary = require('mongoose').model('Dictionary')
module.exports = async () => {
    const dicts = await Dictionary.find()
    if (dicts.length !== 0) {
        return
    }
    const dict = require('../DB/initialDict.json')
    let check = []
    dict.forEach(async function (item) {
        if (check.indexOf(item.term) == -1) {
            check.push(item.term)
            var dictionary = new Dictionary(item)
            await dictionary.save()
        }
    })

}