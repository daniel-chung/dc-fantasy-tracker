// /public/ng-app/pages/pgselect/pgselect-controller.js


var FbsPgSelect = angular.module('fbs.pgselect', []);

FbsPgSelect.controller('fbs.pgselect.pgselectCtrl', function(
    $scope, $rootScope, $interval, pgselectFactory) {

  // Update the root scope
  $rootScope.navMessage = 'Pick a player to analyze!';
  $rootScope.isLandingPage = '';

  // Initialize the ng-model data for the list of available players
  $scope.players = [];

  // Retrieve the list of players from SQL and update the model
  pgselectFactory.getPlayers()
    .then(function(response) {
      $scope.players = response.data;
    });
});


// EOF -------------------------------------------------------------------------
