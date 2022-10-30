var mongoose = require('mongoose'), Schema=mongoose.Schema;

var dictionarySchema=new Schema({
    category: {type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']},
    term: {type:String, unique: true, dropDups: true}
});
dictionarySchema.index({term: 1}, {unique: true})

module.exports=mongoose.model('Dictionary', dictionarySchema).init()