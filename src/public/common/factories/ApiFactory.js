angular.module('pentApp')
.factory('apiFactory', function($http, Flash){

  return {
    createNeed : createNeed,
    createUser : createUser,
    searchNeed : searchNeed,
    searchUser : searchUser
  };

  function createNeed(need) {
    return $http.post('/api/needs', need, null);
  }

  function createUser(user) {
    return $http.post('/api/users', user, null);
  }

  function searchNeed(query) {
    return $http.get(`/api/needs?query=${query}`, null);
  }

  function searchUser(query) {
    return $http.get(`/api/users?query=${query}`, null);
  }

});
