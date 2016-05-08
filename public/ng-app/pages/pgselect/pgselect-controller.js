// /public/ng-app/pages/pgselect/pgselect-controller.js


var fbtPgSelect = angular.module('fbt.pgselect', []);

fbtPgSelect.controller('fbt.pgselect.pgselectCtrl', function(
    $scope, $rootScope, pgselectFactory) {

  // Update the root scope
  $rootScope.isLandingPage = '';

  // Initialize the ng-model data for the list of available players
  $scope.players = [];

  // Create a list of populat players
  $scope.popularPlayers = [
    {"id": 156, "name": "Derek Jeter"},
    {"id": 44, "name": "Ben Zobrist"},
    {"id": 487, "name": "Yoenis Cespedes"},
    {"id": 12, "name": "Albert Pujols"},
    {"id": 344, "name": "Mark Teixeira"},
    {"id": 271, "name": "Joey Votto"}
  ];

  // Retrieve the list of players from SQL and update the model
  pgselectFactory.getPlayers()
    .then(function(response) {
      $scope.players = response.data;
    });
});


// EOF -------------------------------------------------------------------------
