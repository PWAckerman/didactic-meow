angular.module('didacticMeowApp').service('userService', function(firebase, $firebaseAuth, $state){
  var authRef = new Firebase(firebase.url);
  var userRef = new Firebase(firebase.url + '/users/');
  var auth = $firebaseAuth(authRef);
  this.getUser = function(){
    return auth.$getAuth();
  }
  this.getUsers = function(){
    return new Firebase(firebase.url + '/users/');
  }

  this.register = function(newUser){
    return auth.$createUser(newUser);
  }

  this.login = function(user){
    return auth.$authWithPassword(user);
  }

  this.logout = function(user) {
    sessionStorage.user = '';
    return auth.$unauth();
  }

  this.getSessionStorage = function(){
    var user;
    if(sessionStorage.user){
      user = JSON.parse(sessionStorage.user);
    } else {
      user = '';
    }
    return user;
  }

  auth.$onAuth(function(authData){
    if (!authData) {
      console.log('No Auth Data!')
      $state.go('login');
    }
  })
})
