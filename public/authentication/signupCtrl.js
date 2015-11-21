angular.module('didacticMeowApp').controller('signupCtrl', function($scope, $state, userService, $firebaseArray, usersRef, firebase) {
  $scope.users = $firebaseArray(usersRef);
  $scope.useman = usersRef;
  $scope.register = function() {
    userService
      .register($scope.newUser)
      .then(
        function(regUser) {
          var ref = new Firebase(firebase.url + '/users/')
          var userInfo = {
            key: regUser.uid, // ex: simplelogin:29
            fullname: $scope.fullname,
            position: $scope.position,
            organization: $scope.organization,
            internalId: Math.round(Math.random() * 100000),
            isAdmin: false
          }; // user info
          ref.child(regUser.uid).set(userInfo);
        }
      ).then(
        function(resolve) {
          $scope.fullname = '';
          $scope.position = '';
          $scope.organization = '';
          $scope.newUser = {};
          $state.go('selection');
        }
      ).catch(
        function(err) {
          console.log(err);
        }
      );
  }
})