// /public/ng-app/pages/pgplayer/pgplayer-controller.js


var FbsPgPlayer = angular.module('fbs.pgplayer', []);

FbsPgPlayer.controller('fbs.pgplayer.pgplayerCtrl', function(
    $scope, $stateParams, pgPlayerData, $state) {
  $scope.playerId = $stateParams.pid;
  $scope.playerStats = pgPlayerData;

  // Populate the correct button colors on load
  $scope.fbsBtnTable = 
    $state.current.name == 'pgplayer.table' ? '' : 'fbs-btn-unselected';
  $scope.fbsBtnChart = 
    $state.current.name == 'pgplayer.chart' ? '' : 'fbs-btn-unselected';

  $scope.changeClass = function(className) {
    if (className == 'fbsBtnTable') {
      $scope.fbsBtnTable = '';
      $scope.fbsBtnChart = 'fbs-btn-unselected';
    }
    else {
      $scope.fbsBtnTable = 'fbs-btn-unselected';
      $scope.fbsBtnChart = '';
    }
  };
});


// EOF -------------------------------------------------------------------------
