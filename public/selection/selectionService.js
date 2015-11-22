angular.module('didacticMeowApp').service('selectionService', function(firebase) {
  //setup a firebase reference
  this.getPatients = function() {
    return new Firebase(firebase.url + '/patients/')
  }
  //species and their corresponding image paths
  this.speciesList = [{
    'dog': 'static/dog.svg'
  }, {
    'cat': 'static/cat.png'
  }, {
    'turtle': 'static/turtle.png'
  }]
})
