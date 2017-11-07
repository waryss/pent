angular.module('pentApp')
.directive('needForm', function() {
  return {
    restrict: 'EA',
    templateUrl: 'shared/directives/NeedForm.html',
    scope : {
      onSubmit : '&'
    },
    controller: function ($scope, apiService, flashService) {
      $scope.submit = function (need) {
        console.log(need);
        let object = {
          'creationdate' : new Date(),
          'status' : 1,
          'detail' : need.detail,
          'provided': {
            'name' : need.name,
            'phone' : need.phone,
            'email' : need.email
          },
          'provider': {}
        }

        apiService.createNeed(object).then(flashService.onSendFormNeed, flashService.onErrorFromApi);
      };

    },
  }
});
