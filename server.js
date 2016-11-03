
var PORT = 80;

var	routes = require('./static/routes/routes.js');

// Express is a web framework for node.js
// that makes nontrivial applications easier to build
var express = require('express');

// Create the server instance
var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/static/addNew.html'));
});

// Print logs to the console and compress pages we send
app.use(express.logger());
app.use(express.compress());
//Serves static files
// Return all pages in the /static directory
// whenever they are requested at '/'
// e.g., http://localhost:3000/index.html
// maps to /static/index.html on this machine
//app.use(express.static(__dirname + '/static'));

// Start the server
var port = process.env.PORT || PORT; // 80 for web, 3000 for development
app.listen(port, function() {
	console.log("Node.js server running on port %s", port);
});
