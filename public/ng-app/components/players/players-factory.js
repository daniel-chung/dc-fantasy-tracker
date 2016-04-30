//players factory
// https://toddmotto.com/rethinking-angular-js-controllers/

angular.module('fbs.players.playersFactory', [])
  .service('playersFactory', function($http) {
    this.getPlayers = function() {
      return $http({
        method: 'GET',
        url: '/api/alldata',
       });
    };

  });


// EOF -------------------------------------------------------------------------
