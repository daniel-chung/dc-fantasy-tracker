
var FbsNavbar = angular.module('fbs.navbar', [
]);

//FbsNavbar.controller('navbarCtrl', 'fbs.navbar.navbarCtrl')

FbsNavbar.directive('fbsNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: "ng-app/components/navbar/navbar.html",
  };
});



// EOF -------------------------------------------------------------------------
