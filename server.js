// /server.js
'use strict';

// Load packages ---------------------------------------------------------------
var express         = require('express');  // express app
var morgan          = require('morgan');   // for debugging
var pg              = require('pg');       // for data model

require('dotenv').load();     // allows us to use .env for security


// Setup Node.js and Express.js ------------------------------------------------
var app = express();
var port = process.env.PORT || 8080;


// log every request to the console in development version
if (process.env.VERSION == "DEV") {
  app.use(morgan('dev'));
}


// Routing links ---------------------------------------------------------------
// set the static files location; /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


// Setup Express routes --------------------------------------------------------
require('./server/routes')(app, pg);


// Start server ----------------------------------------------------------------
app.listen(port, function() {
  console.log('Node.js listening on port ' + port);
});


// EOF -------------------------------------------------------------------------
