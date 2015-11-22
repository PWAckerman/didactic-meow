
//factory suggested by Angular-Fire documentation to help with authentication states
angular.module('didacticMeowApp').factory("Auth", ["$firebaseAuth", "firebase",
  function($firebaseAuth, firebase) {
    var ref = new Firebase(firebase.url);
    return $firebaseAuth(ref);
  }
]);
