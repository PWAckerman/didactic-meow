angular.module('didacticMeowApp').controller('medicationCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams, firebase){
  console.log($stateParams.patientId);
  $scope.patientId = $stateParams.patientId;
  var medicationRef = new Firebase(firebase.url + 'medication/' + $scope.patientId);
  $scope.medications = $firebaseArray(medicationRef);
  $scope.newMed = {};
  $scope.newMed.count = 0;
  $scope.newMed.time = '';
  $scope.newMed.addedBy = $scope.authObj.uid;
  $scope.selection = [1,2,3]
  $scope.setFrequency = function(num, $event){
    if(parseInt(event.srcElement.innerText) < 1){
      $scope.newMed.frequencyText = "time a day"
    } else {
      $scope.newMed.frequencyText = "times a day"
    }
    var spot = parseInt(event.srcElement.innerText) - 1;
    if(event.srcElement.className === 'med-frequency-active'){
      event.srcElement.className = 'med-frequency';
      $scope.newMed.frequency = '';
      $scope.selected = '';
    } else if(event.srcElement.className === 'med-frequency'){
      event.srcElement.className = 'med-frequency-active';
      $scope.newMed.frequency = num;
      $scope.selected = $scope.selection[spot];
    }
  }
  $scope.submitMedication = function() {
    $scope.medications.$add($scope.newMed).then(
      function(resolve) {
        $scope.newMed.frequency = "";
        $scope.newMed.dose = "";
        $scope.newMed.name = "";
      }
    )
  }
})
