var mongoose = require('mongoose'), Schema=mongoose.Schema;

var tweetSchema=new Schema({
    tweet: {type: String, unique: true, dropDups: true},
    created_at: Date,
    category: [{ type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']}],
    flag: String,
    numberOfAnnotations:  { type: Number, default: 0},
    labels: [String],
    annotators: [String]
});

module.exports=mongoose.model('Tweet', tweetSchema);