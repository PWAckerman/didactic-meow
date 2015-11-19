angular.module('didacticMeowApp').controller('labsCtrl', function($scope, $firebaseArray, $stateParams){
  console.log($stateParams.patientId);
  $scope.patientId = $stateParams.patientId;
  
})
