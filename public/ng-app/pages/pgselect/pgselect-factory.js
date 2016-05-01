// /public/ng-app/pages/pgselect/pgselect-factory.js


var FbsPgSelect = angular.module('fbs.pgselect');

FbsPgSelect.service('pgselectFactory', function(
    $http) {
  this.getPlayers = function() {
    return $http({
      method: 'GET',
      url: '/api/alldata',
     });
  };
});


// EOF -------------------------------------------------------------------------
