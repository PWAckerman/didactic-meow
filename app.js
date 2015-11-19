angular.module('didacticMeowApp', ['firebase', 'ui.router'])

  .constant('firebase', {
      'url' : 'https://didactic-meow.firebaseio.com/'
  })

  .constant('loginRedirectPath', '/login')

  .run(["$rootScope", "$state", function($rootScope, $state) {
      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        console.log(error);
        if (error === "AUTH_REQUIRED") {
          $state.go("login");
        }
      });
  }])

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'authentication/login.html',
        controller: 'loginCtrl',
        resolve: {

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
          },
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }
        }
      })
      .state('history', {
        url: '/history/:patientId',
        templateUrl: 'history/history.html',
        controller: 'historyCtrl',
        resolve: {
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }
        }
      })
      .state('medication', {
        url: '/medication/:patientId',
        templateUrl: 'medication/medication.html',
        controller: 'medicationCtrl',
        resolve: {
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }
        }
      })
      .state('labs', {
        url: '/labs/:patientId',
        templateUrl: 'labs/labs.html',
        controller: 'labsCtrl',
        resolve: {
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }
        }
      })
      .state('orders', {
        url: '/orders/:patientId',
        templateUrl: 'orders/orders.html',
        controller: 'ordersCtrl',
        resolve: {
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }
        }
      })
      .state('vitals', {
        url: '/vitals/:patientId',
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
          },
          "currentAuth": ["Auth", function(Auth) {
            // $requ direAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            return Auth.$requireAuth();
          }]
        }
      })

    $urlRouterProvider.otherwise('login');
  });
