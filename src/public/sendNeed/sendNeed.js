'use strict'

angular.module('pentApp.needs.send', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/needs/send', {
    templateUrl: '/needs/send/',
    controller: 'sendNeedCtrl'
  });
}])

.controller('sendNeedCtrl', function(sendNeedFactory, flashFactory) {

  const vm = this;

  vm.need = vm.need || {};

  vm.isWithAccountCreation = false;
  vm.title = "exprimez votre besoin";

  vm.sendForm = function (object, isFromValid) {
    if(isFromValid){
      if(vm.isWithAccountCreation){
        sendNeedFactory.existsUserByEmail(vm.need.user.mail).then(
          function(data) {
            if(data.data && data.data[0] && data.data[0]._source && data[0]._source.email) {
              flashFactory.onExistingEmail(vm.need.user.mail);
            } else {
              sendNeedFactory.pushUser(vm.need.user);
              sendNeedFactory.pushNeed(vm.need);
            }
          },
          function(err){
            flashFactory.onExistingEmail(vm.need.user.mail);
          }
        );
      } else {
        sendNeedFactory.pushNeed(object);
      }
      object = {};
    } else {
      flashFactory.onFromInvalid();
    }
  }

  vm.checkEmail = function (email){
    if(vm.isWithAccountCreation){
      sendNeedFactory.existsUserByEmail(vm.need.user.mail).then(
        function(data) {
          if(data.data && data.data[0] && data.data[0]._source && data.data[0]._source.email) {
            flashFactory.onExistingEmail(vm.need.user.mail);
          }
        }, function(err){}
      );
    }
  }

  vm.login = function (email, password){
    console.log("isValid = "+isValid+"   ---- "+email+" && "+password);
  };

});
