angular.module('didacticMeowApp').directive('nav', function() {
  return {
    restrict: 'AE',
    templateUrl: 'nav/nav.html',
    controller: //this can probably be moved out to an actual controller
      function($scope, userService, selectionService, $firebaseArray, $firebaseObject, firebase) {
        //cut out the middleman by not including this in a service? candidate to be moved to selectionService
      var patientRef = new Firebase(firebase.url + 'patients/');
      //initialize user object to store user data on this scope
      $scope.user = '';
      $scope.noPatient = true;
      //create a ref to the firebase patients list
      var patientsRef = function() {
        return selectionService.getPatients();
      }
      //when a patient is selected, emit a 'patientSelected' event up scope and transport the patients id along with it
      $scope.selectPatient = function(id) {
        $scope.$emit('patientSelected', {
          data: id
        });
      }
      //access the patientsRef as a firebase array, and put it on scope;
      $scope.patients = $firebaseArray(patientsRef());
      //listen for a 'loggedin' event, and put the user data passed to it into the scope's user object
      $scope.$on('loggedIn', function(e, args) {
        $scope.user = args.message.data;
        console.log('You logged in!', $scope.user);
      });
      //listen for a 'loggedOut' event,  then empty the relevant scope objects
      $scope.$on('loggedOut', function(e, args) {
        $scope.user = '';
        sessionStorage.user = '';
        console.log("You signed out!", $scope.user);
      })
      //listen for a showMenu event, which populates the menu with individual patient data, instead of patient selection
      $scope.$on('showMenu', function(e, args) {
        $scope.noPatient = false;
        $scope.patientId = args.data;
        //get the patient data through a query for this specific patient; we need to pull by a specific property, not by the key since we don't have it (why not? I don't remember)
        $scope.patientData = $firebaseObject(patientRef.orderByChild('internalId').equalTo($scope.patientId));
        //when the patient data is loaded, extract the ACTUAL patient data
        $scope.patientData.$loaded().then(
          function() {
            $scope.patientData = $scope.patientData[Object.keys($scope.patientData)[3]];
            console.log($scope.patientData);
          }
        );
      })
      //emit an event that notifies up scope that the user has loggedout
      $scope.logout = function() {
        $scope.$emit('logout', {
          message: 'You will never see this'
        })
        return userService.logout();
      }
    }
  }
})
