// /public/ng-app/components/navbar/navbar-directive.js


var fbtNavbar = angular.module('fbt.navbar', []);

fbtNavbar.directive('fbtNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'ng-app/components/navbar/navbar.html'
  };
});


// EOF -------------------------------------------------------------------------
