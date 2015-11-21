angular.module('didacticMeowApp').service('selectionService', function(firebase) {
  var user = '1';
  this.getPatients = function() {
    return new Firebase(firebase.url + '/patients/')
  }
  this.speciesList = [{
    'dog': 'static/dog.svg'
  }, {
    'cat': 'static/cat.png'
  }, {
    'turtle': 'static/turtle.png'
  }]
})