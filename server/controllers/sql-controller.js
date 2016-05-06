// /server/controllers/sql-controller.js
'use strict';


// Main export class -----------------------------------------------------------
function SqlHandler (pg) {

  // helper functions
  var returnQuery = function(req, res) {

    // For testing locally
    if (process.env.VERSION != "DEV")
      pg.defaults.ssl = true;

    // Connect to Postgres
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {

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
    returnQuery(req, res);
  };  // End get all players method ----------------------------------------- //


  // Get player by id ------------------------------------------------------- //
  this.getPlayerId = function(req, res) {
    req.query = "SELECT * FROM batting WHERE id = $1;"
    req.queryVal = req.params.id;
    returnQuery(req, res);
  };  // End get player by id method ---------------------------------------- //


  // Get average stats ------------------------------------------------------ //
  this.getStatsAll = function(req, res) {
    req.query = 
      'SELECT ' +
      '  age, ' +
      '  r * 162 / g r, ' +
      '  hr * 162 / g hr, ' +
      '  rbi * 162 / g rbi, ' +
      '  sb * 162 / g sb, ' +
      '  obp ' +
      'FROM ( ' +
      '  SELECT ' +
      '    age, ' +
      '    sum(g) g, ' +
      '    sum(r) r, ' +
      '    sum(hr) hr, ' +
      '    sum(rbi) rbi, ' +
      '    sum(sb) sb, ' +
      '    avg(obp) obp ' +
      '  FROM batting ' +
      '  GROUP BY 1' +
      ') AS a ' +
      'ORDER BY 1 asc;';
    returnQuery(req, res);
  };  // End get player by id method ---------------------------------------- //
};
  

// Export the handler class ----------------------------------------------------
module.exports = SqlHandler;


// EOF -------------------------------------------------------------------------

