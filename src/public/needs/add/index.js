'use strict'

angular.module('pentApp.needs.add', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/needs/add', {
    templateUrl: '/needs/add/',
    controller: 'AddNeedCtrl'
  });
  $routeProvider.when('/', {
    templateUrl: '/needs/add/',
    controller: 'AddNeedCtrl'
  });
  $routeProvider.when('/#', {
    templateUrl: '/needs/add/',
    controller: 'AddNeedCtrl'
  });
}])

.controller('AddNeedCtrl', function(addNeedFactory, flashFactory) {

  const vm = this;

  vm.need = vm.need || {};

  vm.isWithAccountCreation = false;
  vm.title = "exprimez votre besoin";

  vm.sendForm = function (object, isFromValid) {
    if(isFromValid){
      if(vm.isWithAccountCreation){
        addNeedFactory.existsUserByEmail(vm.need.user.mail).then(
          function(data) {
            if(data.data && data.data[0] && data.data[0]._source && data[0]._source.email) {
              flashFactory.onExistingEmail(vm.need.user.mail);
            } else {
              addNeedFactory.pushUser(vm.need.user);
              addNeedFactory.pushNeed(vm.need);
            }
          },
          function(err){
            flashFactory.onExistingEmail(vm.need.user.mail);
          }
        );
      } else {
        addNeedFactory.pushNeed(object);
      }
      object = {};
    } else {
      flashFactory.onFromInvalid();
    }
  }

  vm.checkEmail = function (email){
    if(vm.isWithAccountCreation){
      addNeedFactory.existsUserByEmail(vm.need.user.mail).then(
        function(data) {
          if(data.data && data.data[0] && data.data[0]._source && data.data[0]._source.email) {
            flashFactory.onExistingEmail(vm.need.user.mail);
          }
        }, function(err){}
      );
    }
  }

});
