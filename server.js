// /server.js
'use strict';

// Load packages ---------------------------------------------------------------
var express         = require('express');           // express app
var session         = require('express-session');   // session for cookies
var cookieParser    = require('cookie-parser');     // parse cookies
var morgan          = require('morgan');            // for debugging
var bodyParser      = require('body-parser');       // for forms
var pg              = require('pg');             // for data model

require('dotenv').load();     // allows us to use .env for security


// Setup Node.js and Express.js ------------------------------------------------
var app = express();
var port = process.env.PORT || 8080;


// Other configurations
app.use(morgan('dev'));                                           // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));              // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                       // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));   // parse application/vnd.api+json as json

app.use(cookieParser());                                          // set up session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  httpOnly: false,
}));


// Setup mysql -----------------------------------------------------------------


// Routing links ---------------------------------------------------------------
// set the static files location; /public/img will be /img for users
app.use(express.static(__dirname + '/public'));


// Setup Express routes --------------------------------------------------------
require('./server/routes.js')(app);


// Start server ----------------------------------------------------------------
app.listen(port, function() {
  console.log('Node.js listening on port ' + port);
});


// EOF -------------------------------------------------------------------------
