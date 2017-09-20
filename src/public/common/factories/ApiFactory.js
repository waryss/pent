angular.module('pentApp')
.factory('apiFactory', function($http, Flash){

  return {
    createNeed : createNeed,
    createUser : createUser
  };

  function createNeed(need) {
    return $http.post('/api/needs', need, null);
  }

  function createUser(user) {
    return $http.post('/api/users', user, null);
  }

});
