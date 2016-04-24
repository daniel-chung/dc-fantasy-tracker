// /server/routes.js
'use strict';

// Load packages ---------------------------------------------------------------
//var request   = require('request');

module.exports = function(app, pg) {

  app.route('/')
    .get(function(req, res) {
      res.sendFile('index.html');
  });

  app.route('/api/alldata')
    .get(function(req, res) {
      pg.defaults.ssl = true;

      // Connect to pg
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        var data = [];
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        var results = client.query("SELECT * FROM players;");

        // Stream results back one row at a time
        results.on('row', function(row) {
          data.push(row);
        });

        // After all data is returned, close connection and return results
        results.on('end', function() {
          done();
          return res.json(data);
        });
      });
    });

};

// EOF -------------------------------------------------------------------------
