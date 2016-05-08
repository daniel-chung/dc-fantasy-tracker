// /public/ng-app/pages/pglanding/pglanding-controller.js


var FbsPgLanding = angular.module('fbs.pglanding', []);

FbsPgLanding.controller('fbs.pglanding.pglandingCtrl', function(
    $rootScope) {

  // Update the root scope
  $rootScope.isLandingPage = 'landingPage';
});


// EOF -------------------------------------------------------------------------
