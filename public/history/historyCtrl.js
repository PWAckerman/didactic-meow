angular.module('didacticMeowApp').controller('historyCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams, firebase) {
  console.log($stateParams.patientId);
  //pass the patient id from the state parameters to scope, probably an unnecesssary step
  $scope.patientId = $stateParams.patientId;
  //build a firebase ref with the patient id
  var historyRef = new Firebase(firebase.url + 'history/' + $scope.patientId);
  //use the firebase ref to create a firebase array
  $scope.history = $firebaseArray(historyRef);
  //record the date at the moment, and put it on the scope so it can be displayed in the view
  $scope.currentDate = Date.now();
  //create an empty object to store record vairables
  $scope.newRecord = {};
  //pull information from the currently logged in user (parent scope)
  $scope.newRecord.admittedBy = $scope.authObj.password.email;
  $scope.newRecord.enteredId = $scope.authObj.uid;
  $scope.newRecord.date = $scope.currentDate;
  //add the assembled record to the firebase array
  $scope.submitRecord = function() {
    $scope.history.$add($scope.newRecord).then(
      //after the promise is returned, empty the newRecord object so that a new record may be entered
      function(resolve) {
        $scope.newRecord.title = "";
        $scope.newRecord.condition = "";
        $scope.newRecord.location = "";
      }
    )
  }
})
