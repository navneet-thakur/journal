module.exports = function(app){
    app.get('/',function(req,res){
        res.render('login/welcome',{'title':'White Mountains Art Studios'});
    });
}