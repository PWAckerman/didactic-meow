angular.module('didacticMeowApp').controller('medicationCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams){
  console.log($stateParams.patientId);
  $scope.patientId = $stateParams.patientId;
})
