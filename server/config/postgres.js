// /server/config/postgres.js
'use strict';

// Load packages ---------------------------------------------------------------
var lineReader = require('line-reader');
var Promise = require('bluebird');
var pg = require('pg');    // for data model
require('dotenv').load();  // allows us to use .env for security


// Initialize database ---------------------------------------------------------
//pg.defaults.ssl = true;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  // DROP table to start fresh
  var sqldelete = "DROP TABLE IF EXISTS players;";
  client.query(sqldelete)
    .on('error', function(err) {
      console.log('Error while deleting table:', err);
      client.end();
    })
    .on('end', function(result) {
      console.log('Deletion successful');
      createTable();
    });


  // Create table
  function createTable() {
    var sqlcreate = "";
    sqlcreate += "CREATE TABLE players ( ";
    sqlcreate += "ID INT PRIMARY KEY NOT NULL, ";
    sqlcreate += "NAME TEXT NOT NULL";
    sqlcreate += ");";
    client.query(sqlcreate)
      .on('error', function(err) {
        console.log('Error while creating table:', err);
        client.end();
      })
      .on('end', function(result) {
        console.log('Creation successful');
        insertRows();
      });
  };


  // Read in the datafile to populate our SQL table
  function insertRows() {
    var datafile = __dirname + '/players.csv';
    var playersSchema = ['ID', 'NAME'];
    var eachLine = Promise.promisify(lineReader.eachLine);

    eachLine(datafile, function(line) {
      console.log(line);
      var rowdata = line.split(',');
      console.log('rowdata', rowdata);
      var insertresult = insertRow(client, 'players', playersSchema, rowdata);
    }).then(function() {
      console.log('done');
      setTimeout(function() { client.end(); }, 500);
    }).catch(function(err) {
      console.error(err);
      client.end();
  });
};


  // Function for inserting sql data
  function insertRow(pgclient, tblname, schema, data) {
    var sqlquery = "";
    sqlquery += "INSERT INTO ";
    sqlquery += tblname;
    sqlquery += " (" + schema.join(",") + ") ";
    sqlquery += "VALUES ('" + data.join("','") + "');";
    pgclient.query(sqlquery)
      .on('error', function(err) {
        console.log('Error inserting data:', err);
        return false;
      });
    return true;
  }

});


// EOF -------------------------------------------------------------------------
