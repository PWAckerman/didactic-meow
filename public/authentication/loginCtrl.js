angular.module('didacticMeowApp').controller('loginCtrl', function($scope, userService, $state, firebase, $firebaseObject) {
  $scope.error = '';
  sessionStorage.user = '';
  //login
  $scope.login = function() {
    //invoke UserService login method with user object on scope
    userService.login($scope.user).then(
      //when promise is returned, use that authData
      function(authData) {
        //new firebase ref using authData uid information, which is used as a key to store other user information in a separate users store
        $scope.userRef = new Firebase(firebase.url + 'users/' + authData.uid);
        //translate that specific user firebase ref into a firebase object
        $scope.userperson = $firebaseObject($scope.userRef);
        //once that user's information has loaded
        $scope.userperson.$loaded().then(
          function(data) {
          //put session data on the scope!
            $scope.sessionData = {}
            for (var x in data) {
              if (x === '$$conf' || typeof data[x] === 'function') {
              } else {
                $scope.sessionData[x] = data[x]
              }
            }
            //put scope sessionData so that it can be retrieved potentially
            sessionStorage.user = JSON.stringify($scope.sessionData);
            //emit login event, and pass sessionData up the scope through a message
            $scope.$emit('login', {
              data: $scope.sessionData
            });
          }
        )
      }
    ).catch(
      //do error stuff
      function(err) {
        if (err.code = "INVALID_EMAIL") {
          $scope.error = 'You are using an invalid email';
        } else if (err.code = "INVALID_USER") {
          $scope.error = 'That user does not exist.'
        }
      }
    )
  }

  //invoke userService for logging out
  $scope.logout = function() {
    userService.logout();
  }
})
