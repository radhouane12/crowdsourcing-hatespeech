var mongoose=require('mongoose');

module.exports=function() {
    var db=mongoose.connect('mongodb://localhost:27017/CrowdsourcingHatespeechDB');
    console.log('Connected to MongoDB');
    require('../app/models/user.model');
    return db;
};