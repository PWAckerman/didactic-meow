angular.module('didacticMeowApp').controller('masterCtrl', function($scope, userService, $state){
  $scope.hidden = true;
  $scope.$on('login', function(e, args){
    $scope.hidden = false;
    $scope.$broadcast('loggedIn', {
      message: args
    });
    $scope.authObj = userService.getUser();
    console.log($scope.authObj);
    console.log($scope.hidden)
    $state.go('selection');
  })
  $scope.$on('logout', function(e, args){
    $scope.hidden = true
    $scope.$broadcast('loggedOut', {
      message: 'Logged Out!'
    })
    console.log($scope.hidden);
  })
  $scope.$on('patientSelected', function(e, args){
    console.log('patientSelected');
    $scope.patient = args.data;
    console.log(args.data);
    $scope.$broadcast('showMenu', {
      data: $scope.patient
    });
  })
})
