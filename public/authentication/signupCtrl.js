angular.module('didacticMeowApp').controller('signupCtrl', function($scope, $state, userService, $firebaseArray, usersRef, firebase) {
  //establish a firebase array from the userRef(passed in through state resolve)
  $scope.users = $firebaseArray(usersRef);
  //I know I did this for a reason, but I don't remember why
  $scope.useman = usersRef;
  //for new users:
  $scope.register = function() {
    //invoke userService register method, passing it newUser from the scope, which gets their information off of the form bound to its model
    userService
      .register($scope.newUser)
      //after promise is returned and user has been registered with Firebase authentication, we want to create a parallel user object in a separate store to retain other information about the user
      .then(
        //
        function(regUser) {
          var ref = new Firebase(firebase.url + '/users/')
          var userInfo = {
            key: regUser.uid,
            fullname: $scope.fullname,
            position: $scope.position,
            organization: $scope.organization,
            //generate a random internalId for our use
            internalId: Math.round(Math.random() * 100000),
            isAdmin: false
          }; // user info
          //This was in retrospect a dumb way to do it, but this sets a userobject with a key of their UID and change the userInfo
          ref.child(regUser.uid).set(userInfo);
        }
      ).then(
        //when the promise is returned, reset the scope variables and object, then change state to selection
        function(resolve) {
          $scope.fullname = '';
          $scope.position = '';
          $scope.organization = '';
          $scope.newUser = {};
          //this actually sends the user to login, because they are not authenticated yet, incorporate login as registration step so this is a smoother experience
          $state.go('selection');
        }
      ).catch(
        //catch errors and log them so they are not lost into the ether
        function(err) {
          console.log(err);
        }
      );
  }
})
