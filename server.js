
var PORT = 3000;

var	routes = require('./static/routes/routes.js');

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');
var handlebars = require('express3-handlebars')
var path = require('path');

// Create the server instance
var app = express();

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(app.router);

//Serves static files
// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
app.use(express.static(__dirname + '/static'));

 app.get('/', function(req, res) {
     res.render(__dirname+'/static/index.handlebars');
 });

//app.get('/', function(req, res) {
//    res.sendFile(express.static(path.join(__dirname + '/static/addNew.html')));
//});
// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});
