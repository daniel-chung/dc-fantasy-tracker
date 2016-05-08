// /public/ng-app/pages/pglanding/pglanding-controller.js


var fbtPgLanding = angular.module('fbt.pglanding', []);

fbtPgLanding.controller('fbt.pglanding.pglandingCtrl', function(
    $rootScope) {

  // Update the root scope
  $rootScope.isLandingPage = 'landingPage';
});


// EOF -------------------------------------------------------------------------
