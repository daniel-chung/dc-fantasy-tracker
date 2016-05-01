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

  // Function that calls the service that creates a d3 visualization
  $scope.updateChart = function() {
    statschartFactory.drawChart(pgPlayerData.map(function(e) {
        return { age: e.age, stat: e[$scope.chartstat] };
      }), '#chartid');      
  };

  // Call the above chart on initial load
  $scope.updateChart();
});


// EOF -------------------------------------------------------------------------
