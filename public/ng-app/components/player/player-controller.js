//.js

var Player = angular.module('fbs.player', [
  'fbs.player.playerFactory'
]);

Player.controller('fbs.player.playerCtrl', function(
    $scope, $stateParams, playerFactory) {

  $scope.playerId = $stateParams.pid;
  $scope.playerStats = [];

//  $scope.players = [];

  playerFactory.getStats($stateParams.pid)
    .then(function(response) {
      $scope.playerStats = response.data;
    });


});


// EOF -------------------------------------------------------------------------
