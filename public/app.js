angular.module('didacticMeowApp', ['firebase', 'ui.router'])
//Sets base url for firebase interactions through firebase references
  .constant('firebase', {
      'url' : 'https://didactic-meow.firebaseio.com/'
  })
//Sets path for login redirect (unused)
  .constant('loginRedirectPath', '/login')
//recommended by Firebase/Angular-Fire, allows us to secure routes at initialization
  .run(["$rootScope", "$state", function($rootScope, $state) {
      $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
        //catchwa the error thrown when the $requireAuth promise is rejected, which keeps certain states from being accessible to those not logged in
        console.log(error);
        if (error === "AUTH_REQUIRED") {
          $state.go("login");
        }
      });
  }])
//Configuration mostly used for routing, route security, and establishing firebase references
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
          //establishes a premade firebase ref from the userService to inject into the controller
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
          //establishes a premade firebase ref from the selectionService (which is really for patient selections), which we can inject into the controller
          selectionRef: function(selectionService){
            return selectionService.getPatients();
          },
          currentAuth: function(Auth) {
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            // This stateChangeError allows us to secure the route
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
            // This stateChangeError allows us to secure the route
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
            // This stateChangeError allows us to secure the route
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
            // This stateChangeError allows us to secure the route
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
            // This stateChangeError allows us to secure the route
            return Auth.$requireAuth();
          }
        }
      })
      .state('vitals', {
        url: '/vitals/:patientId',
        templateUrl: 'vitals/vitals.html',
        controller: 'vitalsCtrl',
        resolve: {
          //firebase refs to pass in to the controllers...some of these may no longer be in use after refactoring the controller, check this later
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
            // $requireAuth returns a promise so the resolve waits for it to complete
            // If the promise is rejected, it will throw a $stateChangeError (see above)
            // This stateChangeError allows us to secure the route
            return Auth.$requireAuth();
          }]
        }
      })
      //if anything else is specified, redirect to the 'login' state
    $urlRouterProvider.otherwise('login');
  });
