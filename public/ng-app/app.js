// /public/ng-app/app.js
'use strict';

// Load packages ---------------------------------------------------------------
//var request   = require('request');


// Define angular module -------------------------------------------------------
// Use namespace 'fbs' for fantasy baseball statistics
var Application = angular.module('fbs.application', [
  'ui.router',
  'fbs.players',
  'fbs.players.playersFactory',  // do i need this?
  'fbs.player',
  'fbs.navbar'
]);


// Define Routing --------------------------------------------------------------
Application.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/players");
  $stateProvider
    .state('players', {
      url: "/players",
      templateUrl: "ng-app/components/players/players.html",
      controller: 'fbs.players.playersCtrl'
    })
    .state('player', {
      url: "/player/:pid",
      templateUrl: "ng-app/components/player/player.html",
      controller: 'fbs.player.playerCtrl'
    })
  ;

});


// EOF -------------------------------------------------------------------------
