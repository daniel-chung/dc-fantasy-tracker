// /public/ng-app/components/footer/footer-directive.js


var fbtFooter = angular.module('fbt.footer', []);

fbtFooter.directive('fbtFooter', function() {
  return {
    restrict: 'E',
    templateUrl: 'ng-app/components/footer/footer.html',
    controller: 'fbt.footer.footerCtrl'
  };
});


// EOF -------------------------------------------------------------------------
