angular.module('didacticMeowApp').controller('vitalsCtrl',
  function($scope, chartService, vitalsRef, heartRef, breathRef, tempRef, $firebaseArray, $stateParams, firebase, $firebaseObject){
    console.log($stateParams.patientId);
    $scope.patientId = $stateParams.patientId;
    var vitalsRef = new Firebase(firebase.url + 'vitals/' + $scope.patientId);
    var heartRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/heartrate/');
    var breathRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/breathrate/');
    var tempRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/temp/');

    // var vitalsList = $firebaseObject(vitalsRef);
    // vitalsList.$loaded().then(
    //   function(resolve){
    //     $scope.vitalsList = vitalsList;
    //   }
    // )
    $scope.current = '';
    $scope.vitals = $firebaseArray(vitalsRef);
    $scope.heart = $firebaseArray(heartRef);
    $scope.temp = $firebaseArray(tempRef);
    $scope.breath = $firebaseArray(breathRef);
    $scope.vitals.$loaded().then(function (vitals) {
      $scope.InitChart = chartService.InitChart($scope.heart);
      $scope.heartChart = function(){
        $scope.current = 'Heart Rate';
        return chartService.InitChart($scope.heart);}
      $scope.breathChart = function(){
        $scope.current = 'Respiratory Rate';
        return chartService.InitChart($scope.breath);}
      $scope.tempChart = function(){
        $scope.current = 'Temperature';
        return chartService.InitChart($scope.temp);}
      $scope.heartChart();
    });
    $scope.addHeartReading = function(){
      $scope.heart.$add({
        reading: $scope.newHeart,
        time: Date.now(),
        user: $scope.authObj.uid
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
        time: Date.now(),
        user: $scope.authObj.uid
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
        time: Date.now(),
        user: $scope.authObj.uid
      }).then(
        function(resolve){
          $scope.newTemp = '';
          $scope.tempChart();
        }
      )
    }
    }
)
