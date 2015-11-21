angular.module('didacticMeowApp').directive('nav', function() {
  return {
    restrict: 'AE',
    templateUrl: 'nav/nav.html',
    controller: function($scope, userService, selectionService, $firebaseArray, $firebaseObject, firebase) {
      var patientRef = new Firebase(firebase.url + 'patients/');
      $scope.user = '';
      $scope.noPatient = true;
      var patientsRef = function() {
        return selectionService.getPatients();
      }
      $scope.selectPatient = function(id) {
        $scope.$emit('patientSelected', {
          data: id
        });
      }
      $scope.patients = $firebaseArray(patientsRef());
      $scope.$on('loggedIn', function(e, args) {
        $scope.user = args.message.data;
        console.log('You logged in!', $scope.user);
      });
      $scope.$on('loggedOut', function(e, args) {
        $scope.user = '';
        sessionStorage.user = '';
        console.log("You signed out!", $scope.user);
      })
      $scope.$on('showMenu', function(e, args) {
        $scope.noPatient = false;
        $scope.patientId = args.data;
        $scope.patientData = $firebaseObject(patientRef.orderByChild('internalId').equalTo($scope.patientId));
        $scope.patientData.$loaded().then(
          function() {
            $scope.patientData = $scope.patientData[Object.keys($scope.patientData)[3]];
            console.log($scope.patientData);
          }
        );
      })
      $scope.logout = function() {
        $scope.$emit('logout', {
          message: 'You will never see this'
        })
        return userService.logout();
      }
    }
  }
})