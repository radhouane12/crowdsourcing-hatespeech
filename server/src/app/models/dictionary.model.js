var mongoose = require('mongoose'), Schema=mongoose.Schema;

var dictionarySchema=new Schema({
    category: {type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']},
    vocabulary: [String]
});

module.exports=mongoose.model('Dictionary', dictionarySchema);