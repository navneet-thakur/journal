module.exports = function(app){
    app.get('/',function(req,res){
    	res.send('damn it')
        // res.render('index',{'title':'White Mountains Art Studios'});
    });
}