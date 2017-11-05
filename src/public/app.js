angular.module('pentApp', [
  'ngRoute',
  'flash',
  'pentApp.main'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: ''});

}]);
