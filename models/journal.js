var mongoose=require('mongoose');

module.exports=mongoose.model('userinfo',{
    fullname    : {type : String},
    username    : {type : String, unique: true},
    password    : {type : String},
    email       : {type : String, unique: true},
    posts       : [
        {post : {type : String}},
        {published_on : {type : Date, default:Date.now}}
        ],
    last_update : {type : Date, default:Date.now}
});