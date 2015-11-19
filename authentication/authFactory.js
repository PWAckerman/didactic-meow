angular.module('didacticMeowApp').factory("Auth", ["$firebaseAuth", "firebase",
  function($firebaseAuth, firebase) {
    var ref = new Firebase(firebase.url);
    return $firebaseAuth(ref);
  }
]);
