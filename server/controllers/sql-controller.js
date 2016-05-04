// /server/controllers/sql-controller.js
'use strict';


// Main export class -----------------------------------------------------------
function SqlHandler (pg) {

  // helper functions
  var returnQuery = function(req, res) {

    // For testing locally
    if (process.env.VERSION != "DEV")
      req.pg.defaults.ssl = true;

    // Connect to Postgres
    req.pg.connect(process.env.DATABASE_URL, function(err, client, done) {

      var data = [];
      if(err) {
        done();
        console.log(err);
        return res.status(500).json({ success: false, data: err});
      }

      //if (req.hasOwnProperty('queryVal'))
      var results = req.hasOwnProperty('queryVal') ?
        client.query(req.query, [req.queryVal]) : client.query(req.query);

      // Stream results back one row at a time
      results.on('row', function(row) {
        data.push(row);
      });

      // After all data is returned, close connection and return results
      results.on('end', function() {
        done(); // Disconnect
        return res.json(data);
      });
    });
  };


  // Get all players -------------------------------------------------------- //
  this.getPlayersAll = function(req, res) {
    req.query = "SELECT * FROM players;";
    req.pg = pg;
    returnQuery(req, res);
  };  // End get all players method ----------------------------------------- //


  // Get player by id -------------------------------------------------------- //
  this.getPlayerId = function(req, res) {
    req.query = "SELECT * FROM batting WHERE id = $1;"
    req.queryVal = req.params.id;
    req.pg = pg;
    returnQuery(req, res);
  };  // End get player by id method --------------------------------------- //
};
  

// Export the handler class ----------------------------------------------------
module.exports = SqlHandler;


// EOF -------------------------------------------------------------------------
