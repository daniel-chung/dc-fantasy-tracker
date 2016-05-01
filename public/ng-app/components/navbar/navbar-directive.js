// /public/ng-app/components/navbar/navbar-directive.js


var FbsNavbar = angular.module('fbs.navbar', []);

FbsNavbar.directive('fbsNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'ng-app/components/navbar/navbar.html',
    controller: 'fbs.navbar.navbarCtrl'
  };
});


// EOF -------------------------------------------------------------------------
