module.exports = function(app, passport){
    app.get('/',function(req,res){
        var mode=getMode(req);
        res.render('login/welcome',{'title':'Welcome user','mode':mode});
    });
    // app.post('/register',function(req,res){
    //     var name=req.param('full_name')
    //     , username=req.param('username')
    //     , password=req.param('password')
    //     , mail=req.param('email');
    //     res.render('login/register',{'title':'Welcome user','mode':mode});
    // });
    app.post('/register',passport.authenticate('local-signup',{
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));
    app.get('/profile',function(req,res){
        res.send('Hey you did it');
    })
}

function getMode(req){
    var mode=req.param('mode');
        if(mode=='ajax')
            return true;
        else
            return false;
}