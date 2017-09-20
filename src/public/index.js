angular.module('pentApp', [
  'ngRoute',
  'ngFlash',
  'pentApp.needs.add',
  'pentApp.search'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {

  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: ''});

}]);
