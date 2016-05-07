// /public/ng-app/pages/pglanding/pglanding-controller.js


var FbsPgLanding = angular.module('fbs.pglanding', []);

FbsPgLanding.controller('fbs.pglanding.pglandingCtrl', function(
    $rootScope) {

  // Update the root scope
  $rootScope.navMessage = 'You\'re home!';
  $rootScope.showBackgroundImage = 'backgroundImage';
});


// EOF -------------------------------------------------------------------------
