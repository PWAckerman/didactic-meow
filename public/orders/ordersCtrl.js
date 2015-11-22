angular.module('didacticMeowApp').controller('ordersCtrl', function($scope, $firebaseArray, $firebaseObject, $stateParams){
  console.log($stateParams.patientId);
  //this controller has not yet been built, but at least we have the patientId
  $scope.patientId = $stateParams.patientId;
})
