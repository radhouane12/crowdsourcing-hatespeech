var mongoose = require('mongoose'), Schema=mongoose.Schema;

//refreshToken expires after a week or gets deleted upon logout
var refreshTokenSchema=new Schema({
    token: {type: String, unique: true, dropDups: true},
    createdAt: { type: Date, expires: 60*60*24*7}
});

module.exports=mongoose.model('RefreshToken', refreshTokenSchema);