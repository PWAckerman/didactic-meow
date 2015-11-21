angular.module('didacticMeowApp').controller('ordersCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams){
  console.log($stateParams.patientId);
  $scope.patientId = $stateParams.patientId;
})
