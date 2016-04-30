//playersCtrl.js

var fbsPlayers = angular.module('fbs.players', [
  'fbs.players.playersFactory'
]);

fbsPlayers.controller('fbs.players.playersCtrl', function(
    $scope, playersFactory) {

  $scope.players = [];

  playersFactory.getPlayers()
    .then(function(response) {
      $scope.players = response.data;
    });

});


// EOF -------------------------------------------------------------------------
