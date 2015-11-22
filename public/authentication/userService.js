angular.module('didacticMeowApp').service('userService', function(firebase, $firebaseAuth, $state){
  //set a reference url for auth, which is the base firebase url
  var authRef = new Firebase(firebase.url);
  //setup a url for parallel user store
  var userRef = new Firebase(firebase.url + '/users/');
  //create an auth Object with the auth Ref
  var auth = $firebaseAuth(authRef);

  this.getUser = function(){
    //get an auth object for a user so that user can be authenticated
    return auth.$getAuth();
  }

  this.getUsers = function(){
    //creates a ref so that a controller can access the users store
    return new Firebase(firebase.url + '/users/');
  }

  this.register = function(newUser){
    //create user within the auth
    return auth.$createUser(newUser);
  }

  this.login = function(user){
    //verify user password information and return auth object
    return auth.$authWithPassword(user);
  }

  this.logout = function(user) {
    //erase session storage
    sessionStorage.user = '';
    //revoke authentication
    return auth.$unauth();
  }

  this.getSessionStorage = function(){
    //check if theres a user in session storage
    var user;
    if(sessionStorage.user){
      //retrieve user information in session storage
      user = JSON.parse(sessionStorage.user);
    } else {
      //user is empty
      user = '';
    }
    return user;
  }

  auth.$onAuth(function(authData){
    if (!authData) {
      //if there is no auth data, return user to login state
      console.log('No Auth Data!')
      $state.go('login');
    }
  })
})
