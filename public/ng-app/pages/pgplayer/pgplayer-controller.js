// /public/ng-app/pages/pgplayer/pgplayer-controller.js


var fbtPgPlayer = angular.module('fbt.pgplayer', []);

fbtPgPlayer.controller('fbt.pgplayer.pgplayerCtrl', function(
    $scope, $stateParams, pgPlayerData, $state) {
  $scope.playerId = $stateParams.pid;
  $scope.playerStats = pgPlayerData;
});


// EOF -------------------------------------------------------------------------
