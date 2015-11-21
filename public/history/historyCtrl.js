angular.module('didacticMeowApp').controller('historyCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams, firebase) {
  console.log($stateParams.patientId);
  $scope.patientId = $stateParams.patientId;
  var historyRef = new Firebase(firebase.url + 'history/' + $scope.patientId);
  $scope.history = $firebaseArray(historyRef);
  $scope.currentDate = Date.now();
  $scope.newRecord = {};
  $scope.newRecord.admittedBy = $scope.authObj.password.email;
  $scope.newRecord.enteredId = $scope.authObj.uid;
  $scope.newRecord.date = $scope.currentDate;
  $scope.submitRecord = function() {
    $scope.history.$add($scope.newRecord).then(
      function(resolve) {
        $scope.newRecord.title = "";
        $scope.newRecord.condition = "";
        $scope.newRecord.location = "";
      }
    )
  }
})