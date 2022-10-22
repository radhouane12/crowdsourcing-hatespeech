var mongoose = require('mongoose'), Schema=mongoose.Schema;

var annotatedTweetSchema=new Schema({
    tweet: {type: String, unique: true, dropDups: true},
    created_at: Date,
    category: [{ type: String, enum: ['Disability','Gender','Sexuality','Race','Religion','Ethnicity']}],
    finalLabels: [String],
    annotators: [String]
});

module.exports=mongoose.model('annotatedTweet', annotatedTweetSchema);