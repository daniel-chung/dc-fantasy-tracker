// /server/config/postgres.js
'use strict';

// Load packages ---------------------------------------------------------------
var lineReader = require('line-reader');
var Promise = require('bluebird');
var pg = require('pg');    // for data model
require('dotenv').load();  // allows us to use .env for security


// Initialize database ---------------------------------------------------------
// For testing locally
if (process.env.VERSION != "DEV")
  pg.defaults.ssl = true;

pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');


/* Players */

  // DROP table to start fresh
  var sqldelete = "DROP TABLE IF EXISTS players;";
  client.query(sqldelete)
    .on('error', function(err) {
      console.log('Error while deleting table 1:', err);
      client.end();
    })
    .on('end', function(result) {
      console.log('Deletion successful 1');
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
        console.log('Error while creating table 1:', err);
        client.end();
      })
      .on('end', function(result) {
        console.log('Creation successful 1');
        insertRows();
      });
  };


  // Read in the datafile to populate our SQL table
  function insertRows() {
    var datafile = __dirname + '/players.csv';
    var playersSchema = ['ID', 'NAME'];
    var eachLine = Promise.promisify(lineReader.eachLine);

    eachLine(datafile, function(line) {
      //console.log(line);
      var rowdata = line.split(',');
      //console.log('rowdata', rowdata);
      var insertresult = insertRow(client, 'players', playersSchema, rowdata);
    }).then(function() {
      console.log('done 1');
//      setTimeout(function() { client.end(); }, 500);
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
        console.log('Error inserting data 1:', err);
        return false;
      });
    return true;
  }


/* Batting */

  // DROP table to start fresh
  var sqldelete = "DROP TABLE IF EXISTS batting;";
  client.query(sqldelete)
    .on('error', function(err) {
      console.log('Error while deleting table 2:', err);
      client.end();
    })
    .on('end', function(result) {
      console.log('Deletion successful 2');
      createBattingTable();
    });


  // Create table
  function createBattingTable() {
    var sqlcreate = "";
    sqlcreate += "CREATE TABLE batting ( ";
    sqlcreate += "ID INT NOT NULL,";
    sqlcreate += "YEAR INT NOT NULL,";
    sqlcreate += "AGE INT NOT NULL,";
    sqlcreate += "LG TEXT NOT NULL,";
    sqlcreate += "G INT NOT NULL,";
    sqlcreate += "PA INT NOT NULL,";
    sqlcreate += "AB INT NOT NULL,";
    sqlcreate += "R INT NOT NULL,";
    sqlcreate += "H INT NOT NULL,";
    sqlcreate += "H2B INT NOT NULL,";
    sqlcreate += "H3B INT NOT NULL,";
    sqlcreate += "HR INT NOT NULL,";
    sqlcreate += "RBI INT NOT NULL,";
    sqlcreate += "SB INT NOT NULL,";
    sqlcreate += "CS INT NOT NULL,";
    sqlcreate += "BB INT NOT NULL,";
    sqlcreate += "SO INT NOT NULL,";
    sqlcreate += "BA DOUBLE PRECISION NOT NULL,";
    sqlcreate += "OBP DOUBLE PRECISION NOT NULL,";
    sqlcreate += "SLG DOUBLE PRECISION NOT NULL,";
    sqlcreate += "OPS DOUBLE PRECISION NOT NULL,";
    sqlcreate += "POS TEXT NOT NULL,";
    sqlcreate += "NAME TEXT NOT NULL";
    sqlcreate += ");";
    client.query(sqlcreate)
      .on('error', function(err) {
        console.log('Error while creating table 2:', err);
        client.end();
      })
      .on('end', function(result) {
        console.log('Creation successful 2');
        insertBattingRows();
      });
  };


  // Read in the datafile to populate our SQL table
  function insertBattingRows() {
    var datafile = __dirname + '/playerstats.csv';
    var playersSchema = [
      'id', 'Year','Age','Lg','G','PA','AB','R','H','H2B','H3B','HR','RBI',
      'SB','CS','BB','SO','BA','OBP','SLG','OPS','Pos','name'];
    var eachLine = Promise.promisify(lineReader.eachLine);
    var counter = -1;
    eachLine(datafile, function(line) {
      counter++;
      if (counter > 0) {
        //console.log(line);
        var rowdata = line.split(',');
        //clean up floats
        for (var j = 4; j < 17; j++) {
          rowdata[j] = rowdata[j].replace(/\.\d*/, '');
          if (rowdata[j] == '') {
            rowdata[j] = '0';
          }
        }
        for (var k = 17; k < 21; k++) {
          if (rowdata[k] == '') {
            rowdata[k] = '0.0'; 
          }
        }
        //console.log('rowdata', rowdata);
        var insertresult = insertRow(client, 'batting', playersSchema, rowdata);
      }
    }).then(function() {
      console.log('done 2');
      setTimeout(function() { client.end(); }, 5000);

    }).catch(function(err) {
      console.error(err);
      client.end();
  });
};











});


// EOF -------------------------------------------------------------------------
