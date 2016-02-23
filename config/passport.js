var LocalStrategy = require('passport-local').Strategy;

// include model
var userinfos = require('../models/journal.js');

module.exports = function(passport){
    // serialize the user
    passport.serializeUser(function(user,done){
       done(null,user.username); 
    });
    
    // deserialize the user
    passport.deserializeUser(function(user,done){
        userinfos.find({'username' : this.user},function(err,user){
            done(err,user);
        });
    });
    
    // strategy settings
    passport.use('local-signup',new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req,username,password,done){
        userinfos.findOne({'username':username},function(err,user){
            if (err)
                return done(err);
            if(user){
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            }
            else{
                var newUser = new userinfos();
                newUser.username = username;
                newUser.password = password;
                
                newUser.save(function(err){
                    if(err)
                        throw err;
                    return done(null, newUser);
                })
            }
        });
    }));
}