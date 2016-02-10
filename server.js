var server_port     = process.env.PORT||3000
, server_ip_address = process.env.IP||'0.0.0.0'
, express           = require('express')
, bodyParser        = require('body-parser')
, morgan            = require('morgan')
, cookieParser      = require('cookie-parser')
, sessionStorage    = require('express-session')

var server = express();

// Template engine settings
server.set('views','./views')
server.set('view engine','jade')

// middlewares
server.use(morgan('dev')); // log every request to the console
server.use(cookieParser()); // read cookies (needed for auth)
server.use(bodyParser.urlencoded({ extended: true })); // get information from html forms
server.use(bodyParser.json());

server.use(express.static('public'));

// ROUTES
var router = express.Router();
// include all routes
var routes = require('./routes')(router)
// REGISTER OUR ROUTES
server.use('/', router);

server.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port );
});