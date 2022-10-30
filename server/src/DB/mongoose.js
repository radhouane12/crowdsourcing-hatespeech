var mongoose=require('mongoose');



module.exports= async function(DB_CONNECT) {
    var db=mongoose.connect(DB_CONNECT, { autoIndex: true});
    console.log('Connected to MongoDB: ', DB_CONNECT);
    require('../app/models/user.model');
    require('../app/models/refreshToken.model');
    require('../app/models/tweet.model');
    require('../app/models/suggestion.model');
    require('../app/models/annotatedTweet.model');
    await require('../app/models/dictionary.model');
    return db;
};