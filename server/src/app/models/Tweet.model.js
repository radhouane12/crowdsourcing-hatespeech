var mongoose = require('mongoose'), Schema=mongoose.Schema;

var tweetSchema=new Schema({
    tweet: String,
    created_at: Date,
    category: {type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']},
    flag: String,
    annotation_number: Number,
    labels: [String],
    annotators:[String],
});

module.exports=mongoose.model('Tweet', tweetSchema);