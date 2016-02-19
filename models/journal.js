var mongoose=require('mongoose');

module.exports=mongoose.models('userinfo',{
    fullname    : {type : String},
    username    : {type : String, unique: true},
    password    : {type : String},
    email       : {type : String, unique: true},
    posts       : {type : String},
    last_update : {type : Date, default:Date.now}
});