angular.module('didacticMeowApp').directive('nav', function(){
  return {
    restrict: 'AE',
    templateUrl: 'nav/nav.html',
    controller: function($scope, userService){
      $scope.show = 'true'
      $scope.user = userService.getSessionStorage();
      $scope.logout = function(){
        $scope.show = 'false';
        return userService.logout();
      }
    }
  }
})
