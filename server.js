var server_port     = process.env.PORT||3000
, server_ip_address = process.env.IP||'0.0.0.0'
, express           = require('express')
, bodyParser        = require('body-parser')
, morgan            = require('morgan')
, cookieParser      = require('cookie-parser')
, session           = require('express-session')
, mongoose          = require('mongoose')
, config            = require('./config/database')
, passport          = require('passport')
, flash             = require('connect-flash')

var server = express();

// Configuration
mongoose.connect(config.url);
require('./config/passport')(passport);

// Template engine settings
server.set('views','./views')
server.set('view engine','jade')

// middlewares
server.use(morgan('dev')); // log every request to the console
server.use(cookieParser()); // read cookies (needed for auth)
server.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
server.use(bodyParser.json());
server.use(session({secret:'NDHYROIFK5J749HJT53FBPVK'}))
server.use(passport.initialize());
server.use(passport.session());

server.use(flash());
server.use(express.static('public'));

// ROUTES
var router = express.Router();
var routes = require('./routes')(router, passport) // include all routes
server.use('/', router); // REGISTER OUR ROUTES
server.use(function(req, res) { res.send('404: Page not Found', 404); }); // 404 handler
// server.use(function(error, req, res, next) { res.send('500: Internal Server Error', 500); }); // 500 error handler

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});