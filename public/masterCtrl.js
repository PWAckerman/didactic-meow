//establishes a 'master controller', which can be passed things from further down scope, and vice versa
angular.module('didacticMeowApp').controller('masterCtrl', function($scope, userService, $state){
//variable used to hide navigation directive
  $scope.hidden = true;
//event listener for when a user has loggedin
  $scope.$on('login', function(e, args){
    //shows navigation directive which is present in all views
    $scope.hidden = false;
    //broadcasts a confirmation down scope, passing user information that was passed up to the master controller down to controllers listening for this broadcast (if I recall
    // correctly, this is user information)
    $scope.$broadcast('loggedIn', {
      message: args
    });
    //gets authObj so that we can establish authiness
    $scope.authObj = userService.getUser();
    console.log($scope.authObj);
    console.log($scope.hidden)
    //now that user is authed, change state to selection state
    $state.go('selection');
  })
  //event listener for when a user is entering a 'logout' state
  $scope.$on('logout', function(e, args){
    //hide the nav menu
    $scope.hidden = true
    //broadcast a confirmation down scope that the user has logged out
    $scope.$broadcast('loggedOut', {
      message: 'Logged Out!'
    })
    console.log($scope.hidden);
    //state change handled further down scope by 'loggedOut' listener
  })
  //event listener for when a patient is selected by the user
  $scope.$on('patientSelected', function(e, args){
    console.log('patientSelected');
    //put the patient data on the master scope, which was passed by the event emitter
    $scope.patient = args.data;
    console.log(args.data);
    //emit event down to Nav directive to change menu from patient selection to selected patient info navigation
    $scope.$broadcast('showMenu', {
      data: $scope.patient
    });
  })
})
