var mongoose = require('mongoose'), Schema=mongoose.Schema;

//refreshToken expires after a week or gets deleted upon logout
var refreshTokenSchema=new Schema({
    token: {type: String, unique: true, dropDups: true},
});

module.exports=mongoose.model('RefreshToken', refreshTokenSchema);