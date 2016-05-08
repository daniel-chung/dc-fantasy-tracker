// /public/ng-app/app.js
'use strict';


// Define angular module -------------------------------------------------------
// Use namespace 'fbt' for fantasy baseball tracker
var Application = angular.module('fbt.application', [
  'ui.router',
  'fbt.pglanding',
  'fbt.pgselect',
  'fbt.pgplayer',
  'fbt.navbar',
  'fbt.footer',
  'fbt.pgplayerchart',
  'fbt.pgplayertable'
]);

// Ensure that new pages load at the top
// http://stackoverflow.com/questions/26444418/autoscroll-to-top-with-ui-router-and-angularjs
Application.run(function($rootScope) { $rootScope.$on("$stateChangeSuccess",
  function () {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; 
  });
});

// Define Routing --------------------------------------------------------------
Application.config(function ($stateProvider, $urlRouterProvider) {

  // Default to the pgplayer.table state when routing to pgplayer state
  // because pgplayer is an abstract state that can't be accessed
  $urlRouterProvider.when("/player/:pid", "/player/:pid/table");

  // Default to the root
  $urlRouterProvider.otherwise("/");

  // Configure the states for Angular UI Routing
  $stateProvider
    .state('pglanding', {
      url: "/",
      templateUrl: "ng-app/pages/pglanding/pglanding.html",
      controller: 'fbt.pglanding.pglandingCtrl'
    })
    .state('pgselect', {
      url: "/select",
      templateUrl: "ng-app/pages/pgselect/pgselect.html",
      controller: 'fbt.pgselect.pgselectCtrl'
    })
    .state('pgplayer', {
      abstract: true,
      url: "/player/:pid",
      templateUrl: "ng-app/pages/pgplayer/pgplayer.html",
      controller: 'fbt.pgplayer.pgplayerCtrl',
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
              controller: 'fbt.pgplayertable.pgplayertableCtrl'
            }
          }
      })
      .state('pgplayer.chart', {
          url: '/chart',
          views: {
            'dropdown': {
              templateUrl: "ng-app/pages/pgplayerchart/pgplayerchartselect.html",
              controller: 'fbt.pgplayerchart.pgplayerchartCtrl'
            },
            'main': {
              templateUrl: "ng-app/pages/pgplayerchart/pgplayerchart.html",
              controller: 'fbt.pgplayerchart.pgplayerchartCtrl'
            }
          }
      });
});


// EOF -------------------------------------------------------------------------
