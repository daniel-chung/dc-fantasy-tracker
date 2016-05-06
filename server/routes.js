// /server/routes.js
'use strict';

// Load controllers ------------------------------------------------------------
var SqlHandler = require(__dirname + '/controllers/sql-controller.js');


// Main routes module ----------------------------------------------------------
module.exports = function(app, pg) {


// Server side routes ----------------------------------------------------------
  app.route('/')
    .get(function(req, res) {
      res.sendFile('index.html');
  });


// API Endpoints ---------------------------------------------------------------

  // Instantiate Server side controllers used in the API endpoints
  var sqlHandler = new SqlHandler(pg);

  app.route('/api/alldata')
    .get(sqlHandler.getPlayersAll);

  app.route('/api/:id')
    .get(sqlHandler.getPlayerId);

  app.route('/api/comparison/all')
    .get(sqlHandler.getStatsAll);

};

// EOF -------------------------------------------------------------------------
