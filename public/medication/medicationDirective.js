angular.module('didacticMeowApp').directive('medBox', function(){
  return {
    templateUrl: 'medication/medBox.html',
    restrict: 'AE',
    scope: {
      medication: '='
    },
    controller: function($scope){
      $scope.administer = function(count, time){
        $scope.medication.count++;
        $scope.medication.time = Date.now();
      }
    }
  }
})
