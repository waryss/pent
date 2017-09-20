'use strict'

angular.module('pentApp')
.factory('addNeedFactory', function(apiFactory, flashFactory, Flash){

  return {
    pushNeed : pushNeed,
    pushUser : pushUser
  };

  function pushNeed(need){
    let object = {
      'creationdate' : new Date(),
      'status' : 1,
      'detail' : need.detail,
      'provided': {
        'name' : need.user.name,
        'phone' : need.user.phone,
        'email' : need.user.email
      },
      'provider': {}
    }

    apiFactory.createNeed(object).then(flashFactory.onSendFormNeed, flashFactory.onErrorFromApi);
  }

  function pushUser(user){
    let object = {
      'firstName' : '',
      'lastName' : '',
      'name' : user.name,
      'phone' : user.phone,
      'email' : user.email,
      'password' : user.password,
      'adress' : {},
      'creationdate' : new Date(),
      'actif' : false,
    }

    apiFactory.createUser(object).then(function(data) {}, flashFactory.onErrorFromApi);
  }

});
