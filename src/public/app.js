var app = angular.module('pentApp', [
  'ngRoute',
  'ngFlash'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'components/home/HomeView.html',
    controller: 'homeCtrl'
  });
  $routeProvider.when('/#', {
    templateUrl: 'components/home/HomeView.html',
    controller: 'homeCtrl'
  });
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: ''});

}]);
