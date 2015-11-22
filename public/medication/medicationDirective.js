angular.module('didacticMeowApp').directive('medBox', function(){
  return {
    templateUrl: 'medication/medBox.html',
    restrict: 'AE',
    scope: {
      //pass in the medication
      medication: '='
    },
    controller: function($scope){
      //record the administration of this particular medication
      $scope.administer = function(count, time){
        $scope.medication.count++;
        $scope.medication.time = Date.now();
      }
      //add bindings to firebase so that this data is permanently recorded
    }
  }
})
