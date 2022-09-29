var mongoose = require('mongoose'), Schema=mongoose.Schema;

var userSchema=new Schema({
    email: {type: String, unique: true, dropDups: true},
    password: String,
});

module.exports=mongoose.model('User', userSchema);