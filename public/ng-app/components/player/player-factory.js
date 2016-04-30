//players factory
// https://toddmotto.com/rethinking-angular-js-controllers/

angular.module('fbs.player.playerFactory', [])
  .service('playerFactory', function($http) {
    this.getStats = function(pid) {
      return $http({
        method: 'GET',
        url: '/api/' + pid
       });
    };

  });


// EOF -------------------------------------------------------------------------
