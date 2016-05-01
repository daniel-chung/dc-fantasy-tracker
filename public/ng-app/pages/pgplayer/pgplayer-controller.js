// /public/ng-app/pages/pgplayer/pgplayer-controller.js


var FbsPgPlayer = angular.module('fbs.pgplayer', []);

FbsPgPlayer.controller('fbs.pgplayer.pgplayerCtrl', function(
    $scope, $stateParams, pgPlayerData) {
  $scope.playerId = $stateParams.pid;
  $scope.playerStats = pgPlayerData;
});


// EOF -------------------------------------------------------------------------
