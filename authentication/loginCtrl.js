angular.module('didacticMeowApp').controller('loginCtrl', function($scope, userService, $state, firebase, $firebaseObject) {
  $scope.error = '';
  sessionStorage.user = '';
  $scope.login = function() {
    userService.login($scope.user).then(
      function(authData) {
        $scope.userRef = new Firebase(firebase.url + 'users/' + authData.uid);
        $scope.userperson = $firebaseObject($scope.userRef);
        $scope.userperson.$loaded().then(
          function(data) {
            $scope.sessionData = {}
            for (var x in data) {
              if (x === '$$conf' || typeof data[x] === 'function') {

              } else {
                $scope.sessionData[x] = data[x]
              }
            }
            sessionStorage.user = JSON.stringify($scope.sessionData);
            $scope.$emit('login', {
              data: $scope.sessionData
            });
          }
        )
      }
    ).catch(
      function(err) {
        if (err.code = "INVALID_EMAIL") {
          $scope.error = 'You are using an invalid email';
        } else if (err.code = "INVALID_USER") {
          $scope.error = 'That user does not exist.'
        }
      }
    )
  }
  $scope.logout = function() {
    userService.logout();
  }
})