// /server/routes.js
'use strict';

// Load packages ---------------------------------------------------------------
//var request   = require('request');

module.exports = function(app) {

  app.route('/')
    .get(function(req, res) {
    	res.sendFile('index.html');
  });

};


// EOF -------------------------------------------------------------------------
