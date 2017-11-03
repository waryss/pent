angular.module('pentApp', [
  'ngRoute',
  // 'ngFlash',
  'pentApp',
  'pentApp.needs.send'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $routeProvider.when('/', {
  //   templateUrl: '/',
  //   controller: 'MainCtrl'
  // });
  // $routeProvider.when('/#', {
  //   templateUrl: '/',
  //   controller: 'MainCtrl'
  // });
//   $routeProvider.when('/needs/send', {
//   templateUrl: '/needs/send/',
//   controller: 'sendNeedCtrl'
// });
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: ''});

}]).controller('MainCtrl', function() {
    const vm = this;
});
