var mongoose = require('mongoose'), Schema=mongoose.Schema;

//refreshToken expires after a week or gets deleted upon logout
var refreshTokenSchema=new Schema({
    tokenFamily: [String],
});

module.exports=mongoose.model('RefreshToken', refreshTokenSchema);