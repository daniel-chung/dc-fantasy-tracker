// /public/ng-app/pages/pgplayerchart/pgplayerchart-controller.js


var fbtPgPlayerChart = angular.module('fbt.pgplayerchart', [
  'fbt.statschart'
]);

fbtPgPlayerChart.controller('fbt.pgplayerchart.pgplayerchartCtrl', function(
    $http, $scope, $rootScope, statschartFactory, pgPlayerData) {
  
  // Testing out root scope
  $rootScope.isLandingPage = '';

  // Initialize ng-model data for the chart dropdown menu
  $scope.chartstat = 'rbi';

  // Initialize ng-model data for the dropdown menu
  $scope.checkbox = 'raw';

  // Initialize ng-model data for the dropdown menu
  $scope.comp = 'nocomp';

  // Function that calls the service that creates a d3 visualization
  $scope.updateChart = function() {
    if ($scope.comp != 'nocomp') {
      $http.get('/api/comparison/' + $scope.comp)
        .then(function(response) {
          var pos = -1;
          var minAge = pgPlayerData[0].age;
          var maxAge = pgPlayerData[pgPlayerData.length - 1].age;
          var formattedData = response.data.map(function(e, i, a) {
            if (e.age >= minAge && e.age <= maxAge) {
              pos++;
              return {
                age: e.age,
                stat: ($scope.checkbox == 'raw' || $scope.chartstat == 'obp') ?
                  Number(pgPlayerData[pos][$scope.chartstat]) :
                  Number(pgPlayerData[pos][$scope.chartstat] * 162 /
                    pgPlayerData[pos].g),
                statcomp: Number(e[$scope.chartstat])
              };
            }
            else {
              return {
                age: e.age,
                stat: undefined,
                statcomp: Number(e[$scope.chartstat])
              };
            }
          });
          statschartFactory.drawChart(
            formattedData, '#chartid', $scope.chartstat);
        });
    }

    else {
      var formattedData = pgPlayerData.map(function(e) {
          if ($scope.checkbox == 'raw' || $scope.chartstat == 'obp') {
            return {
              age: e.age,
              stat: e[$scope.chartstat]
            };
          }
          else {
            return {
              age: e.age,
              stat: (e[$scope.chartstat] * 162 / e.g)
            };
          }
        }
      );
      statschartFactory.drawChart(formattedData, '#chartid', $scope.chartstat);
    }
  };

  // Call the above chart on initial load
  $scope.updateChart();

});


// EOF -------------------------------------------------------------------------
