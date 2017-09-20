angular.module('pentApp')
.factory('apiFactory', function($http, Flash){

  return {
    createNeed : createNeed,
    createUser : createUser
  };

  function createNeed(need) {
    $http.post('/api/needs', need, null);
  }

  function createUser(user) {
    $http.post('/api/users', user, null);
  }

  function onPostFromApi(data){
    var message = '<strong> Well done!</strong>  Action réalisée avec succes.';
    Flash.create('success', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

  function onErrorFromApi(error){
    console.log(error);
    var message = `<strong> ${error.statusText} </strong> ${error.data}`;
    Flash.create('danger', message, 0, {class: 'custom-class', id: 'custom-id'}, true);
  }

});
