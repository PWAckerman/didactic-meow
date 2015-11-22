angular.module('didacticMeowApp').controller('medicationCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams, firebase){
  console.log($stateParams.patientId);
  //pass the patientId from state parameters to the scope
  $scope.patientId = $stateParams.patientId;
  //construct a new firebase reference by appending the patientId
  var medicationRef = new Firebase(firebase.url + 'medication/' + $scope.patientId);
  //new firebase array from medicationRef
  $scope.medications = $firebaseArray(medicationRef);
  //initialize empty newMed object on scope
  $scope.newMed = {};
  //add count property to newMed object
  $scope.newMed.count = 0;
  //add time property to newMed object
  $scope.newMed.time = '';
  //pull newMed addedby property from authObj user id
  $scope.newMed.addedBy = $scope.authObj.uid;
  //select frequency of administration
  $scope.selection = [1,2,3]
  //set the frequency when selected
  $scope.setFrequency = function(num, $event){
    //add a text property so that the display can be grammatically correct
    if(parseInt(event.srcElement.innerText) < 1){
      $scope.newMed.frequencyText = "time a day"
    } else {
      $scope.newMed.frequencyText = "times a day"
    }
    //extract the number value from the button pressed (why did I do it this way?)
    var spot = parseInt(event.srcElement.innerText) - 1;
    //change class on the target element once selected
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
  //add new medication to the array
  $scope.submitMedication = function() {
    $scope.medications.$add($scope.newMed).then(
      //when promise is returned, empty the newMed object
      function(resolve) {
        $scope.newMed.frequency = "";
        $scope.newMed.dose = "";
        $scope.newMed.name = "";
      }
    )
  }
})
