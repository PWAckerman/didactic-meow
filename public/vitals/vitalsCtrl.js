angular.module('didacticMeowApp').controller('vitalsCtrl',
  function($scope, chartService, vitalsRef, heartRef, breathRef, tempRef, $firebaseArray, $stateParams, firebase, $firebaseObject){
    console.log($stateParams.patientId);
    //put the patientId from the params into the scope
    $scope.patientId = $stateParams.patientId;
    //REFS FOR EVERYTHING !
    var vitalsRef = new Firebase(firebase.url + 'vitals/' + $scope.patientId);
    var heartRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/heartrate/');
    var breathRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/breathrate/');
    var tempRef = new Firebase(firebase.url + 'vitals/'  + $scope.patientId + '/temp/');
    //ARRAYS FOR EVERYTHING! vitalsarray might not be necessary
    $scope.current = '';
    $scope.vitals = $firebaseArray(vitalsRef);
    $scope.heart = $firebaseArray(heartRef);
    $scope.temp = $firebaseArray(tempRef);
    $scope.breath = $firebaseArray(breathRef);
    //once the vitals are loaded, then we make the default chart; then we make the functions to contstruct other charts
    $scope.vitals.$loaded().then(function (vitals) {
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
    //pass heart reading to firebase array, and recalculate the chart
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
    //same thing, for respiration
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
    //same thing, for temps
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
