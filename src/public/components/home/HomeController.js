'use strict'

angular.module('pentApp', ['ngRoute'])
.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'components/home/HomeView.html',
    controller: 'homeCtrl'
  });
  $routeProvider.when('/#', {
    templateUrl: 'components/home/HomeView.html',
    controller: 'homeCtrl'
  });
}])
.controller('homeCtrl', function() {

  const vm = this;

});
