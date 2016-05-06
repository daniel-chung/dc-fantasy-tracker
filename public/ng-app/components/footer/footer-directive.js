// /public/ng-app/components/footer/footer-directive.js


var FbsFooter = angular.module('fbs.footer', []);

FbsFooter.directive('fbsFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'ng-app/components/footer/footer.html',
    controller: 'fbs.footer.footerCtrl'
  };
});


// EOF -------------------------------------------------------------------------
