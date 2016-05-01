// /public/ng-app/pages/pgplayerchart/pgplayerchart-controller.js


var FbsPgPlayerChart = angular.module('fbs.pgplayerchart', [
  'fbs.statschart'
]);

FbsPgPlayerChart.controller('fbs.pgplayerchart.pgplayerchartCtrl', function(
    $scope, $rootScope, statschartFactory, pgPlayerData) {
  
  // Testing out root scope
  $rootScope.test = 'chart';

  // Initialize ng-model data for the chart dropdown menu
  $scope.chartstat = 'rbi';

  // Initialize ng-model data for the checkbox
  $scope.checkbox = 'raw';
  
  // Function that calls the service that creates a d3 visualization
  $scope.updateChart = function() {
    statschartFactory.drawChart(pgPlayerData.map(function(e) {
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
      }), '#chartid');      
  };

  // Call the above chart on initial load
  $scope.updateChart();
});


// EOF -------------------------------------------------------------------------
