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

.controller('AddNeedCtrl', function(addNeedFactory) {

  this.need = this.need || {};

  this.isWithAccountCreation = false;
  this.title = "exprimez votre besoin";

  this.sendForm = function () {
    if(this.isWithAccountCreation){
      addNeedFactory.pushUser(this.need.user);
    }
    addNeedFactory.pushNeed(this.need);

    this.need = {};
  }
});
