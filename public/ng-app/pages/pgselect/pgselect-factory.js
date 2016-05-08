// /public/ng-app/pages/pgselect/pgselect-factory.js


var fbtPgSelect = angular.module('fbt.pgselect');

fbtPgSelect.service('pgselectFactory', function(
    $http) {
  this.getPlayers = function() {
    return $http({
      method: 'GET',
      url: '/api/alldata',
     });
  };
});


// EOF -------------------------------------------------------------------------
