var mongoose = require('mongoose'), Schema=mongoose.Schema;

var userSchema=new Schema({
    username: {type: String, unique: true, dropDups: true},
    password: String,
    gender: {type: String, enum: ['Male', 'Female','Divers']},
    age: Number,
    profession: String,
    annualIncome: Number,
    education: String,
    nationality: String,
    residence: String,
    role: {type: String, enum: ['Expert', 'Regular']}
});

module.exports=mongoose.model('User', userSchema);