var mongoose = require('mongoose'), Schema=mongoose.Schema;

var tweetSchema=new Schema({
    tweet: String,
    created_at: Date,
});

module.exports=mongoose.model('Tweet', tweetSchema);