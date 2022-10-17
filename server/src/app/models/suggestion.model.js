var mongoose = require('mongoose'), Schema=mongoose.Schema;

var suggestionSchema=new Schema({
    category: {type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']},
    term: {type:String, unique: true, dropDups: true}
});

module.exports=mongoose.model('Suggestion', suggestionSchema);