angular.module('didacticMeowApp').service('vitalsService', function(firebase){
  //why do I need this? I COMMENTED IT OUT AND IT DIDN'T WORK
  var patient = "1"
  this.getVitals = function(){
    return new Firebase(firebase.url + '/patients/' + patient + '/vitalsigns/');
  }
  this.getHeartRate = function(){
    return new Firebase(firebase.url + '/patients/' + patient + '/vitalsigns/heartrate/');
  }
  this.getBreathRate = function(){
    return new Firebase(firebase.url + '/patients/' + patient + '/vitalsigns/breathRate/');
  }
  this.getTemp = function(){
    return new Firebase(firebase.url + '/patients/' + patient + '/vitalsigns/temp/');
  }
})
