angular.module('didacticMeowApp', ['firebase', 'ui.router'])

  .constant('firebase', {
      'url' : 'https://didactic-meow.firebaseio.com/'
  })

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'authentication/login.html',
        controller: 'loginCtrl',
        resolve: {
          // loginRef: function(userService){
          //   return userService.getUsers();
          // }
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'authentication/signup.html',
        controller: 'signupCtrl',
        resolve: {
          usersRef: function(userService){
            return userService.getUsers();
          }
        }
      })
      .state('selection', {
        url: '/selection',
        templateUrl: 'selection/selection.html',
        controller: 'selectionCtrl',
        resolve: {
          selectionRef: function(selectionService){
            return selectionService.getPatients();
          }
        }
      })
      .state('vitals', {
        url: '/vitals',
        templateUrl: 'vitals/vitals.html',
        controller: 'vitalsCtrl',
        resolve: {
          vitalsRef: function(vitalsService){
            return vitalsService.getVitals();
          },
          heartRef: function(vitalsService){
            return vitalsService.getHeartRate();
          },
          breathRef: function(vitalsService){
            return vitalsService.getBreathRate();
          },
          tempRef: function(vitalsService){
            return vitalsService.getTemp();
          }
        }
      })

    $urlRouterProvider.otherwise('login');
  });
