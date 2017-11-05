angular.module('pentApp')
.directive('login', function() {
  return {
    restrict: 'EA',
    templateUrl: 'common/directives/Login.html',
    scope : {
      onSubmit : '&'
    },
    controller: function ($scope) {

      $scope.login = function (email, password, isValid) {
        if(isValid){
          $scope.onSubmit()(email, password);
        }
      };

    },
  }
});
