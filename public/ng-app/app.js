// /public/ng-app/app.js
'use strict';


// Define angular module -------------------------------------------------------
// Use namespace 'fbs' for fantasy baseball statistics
var Application = angular.module('fbs.application', [
  'ui.router',
  'fbs.pgselect',
  'fbs.pgplayer',
  'fbs.navbar',
  'fbs.footer',
  'fbs.pgplayerchart',
  'fbs.pgplayertable'
]);


// Create a rootscope variable
Application.run(function($rootScope) {
  $rootScope.test = ''; //placeholder';
});


// Define Routing --------------------------------------------------------------
Application.config(function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.when("/player/:pid", "/player/:pid/table");
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('pglanding', {
      url: "/",
      templateUrl: "ng-app/pages/pglanding/pglanding.html",
    })
    .state('pgselect', {
      url: "/select",
      templateUrl: "ng-app/pages/pgselect/pgselect.html",
      controller: 'fbs.pgselect.pgselectCtrl'
    })
    .state('pgplayer', {
      abstract: true,
      url: "/player/:pid",
      templateUrl: "ng-app/pages/pgplayer/pgplayer.html",
      controller: 'fbs.pgplayer.pgplayerCtrl',
      resolve: {
        pgPlayerData: function($http, $stateParams) {
          return $http.get('/api/' + $stateParams.pid).then(function(response) {
            return response.data;
          });
        }
      } 
    })
      .state('pgplayer.table', {
          url: '/table',
          views: {
            'main': {
              templateUrl: "ng-app/pages/pgplayertable/pgplayertable.html",
              controller: 'fbs.pgplayertable.pgplayertableCtrl'
            }
          }
      })
      .state('pgplayer.chart', {
          url: '/chart',
          views: {
            'dropdown': {
              templateUrl: "ng-app/pages/pgplayerchart/pgplayerchartselect.html",
              controller: 'fbs.pgplayerchart.pgplayerchartCtrl'
            },
            'main': {
              templateUrl: "ng-app/pages/pgplayerchart/pgplayerchart.html",
              controller: 'fbs.pgplayerchart.pgplayerchartCtrl'
            }
          }
      })
  ;

});


// EOF -------------------------------------------------------------------------
