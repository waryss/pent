angular.module('pentApp')
.directive('header', function() {
  return {
    restrict: 'EA',
    templateUrl: 'common/directives/header.html',
    scope : {},
    controller: function ($scope) {

    },
  }
});
