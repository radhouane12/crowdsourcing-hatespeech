var mongoose=require('mongoose');



module.exports=function(DB_CONNECT) {
    var db=mongoose.connect(DB_CONNECT);
    console.log('Connected to MongoDB');
    require('../app/models/user.model');
    return db;
};