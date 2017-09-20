'use strict';

angular.module('pentApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/index.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', function($scope) {

  $scope.title = "Formulaire des besoins";

});
