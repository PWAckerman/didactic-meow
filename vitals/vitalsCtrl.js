angular.module('didacticMeowApp').controller('vitalsCtrl',
  function($scope, chartService, vitalsRef, heartRef, breathRef, tempRef, $firebaseArray){
    $scope.vitals = $firebaseArray(vitalsRef);
    $scope.heart = $firebaseArray(heartRef);
    $scope.temp = $firebaseArray(tempRef);
    $scope.breath = $firebaseArray(breathRef);
    $scope.vitals.$loaded().then(function (vitals) {
      $scope.InitChart = chartService.InitChart($scope.heart);
      $scope.heartChart = function(){ return chartService.InitChart($scope.heart);}
      $scope.breathChart = function(){ return chartService.InitChart($scope.breath);}
      $scope.tempChart = function(){ return chartService.InitChart($scope.temp);}
      // $scope.heartChart();
    });
    $scope.addHeartReading = function(){
      $scope.heart.$add({
        reading: $scope.newHeart,
        time: Date.now()
      }).then(
        function(resolve){
          $scope.newHeart = '';
          $scope.heartChart();
        }
      )
    }
    $scope.addBreathReading = function(){
      $scope.breath.$add({
        reading: $scope.newBreath,
        time: Date.now()
      }).then(
        function(resolve){
          $scope.newBreath = '';
          $scope.breathChart();
        }
      )
    }
    $scope.addTempReading = function(){
      $scope.temp.$add({
        reading: $scope.newTemp,
        time: Date.now()
      }).then(
        function(resolve){
          $scope.newTemp = '';
          $scope.tempChart();
        }
      )
    }
    }
)
