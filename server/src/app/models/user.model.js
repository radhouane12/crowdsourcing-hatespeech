var mongoose = require('mongoose'), Schema=mongoose.Schema;

var userSchema=new Schema({
    username: {type: String, unique: true, dropDups: true},
    password: String,
    gender: String,
    age: Number,
    profession: String,
    annualIncome: Number,
    education: String,
    nationality: String,
    residence: String,
});

module.exports=mongoose.model('User', userSchema);