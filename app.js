angular.module('didacticMeowApp', ['firebase', 'ui.router'])

  .constant('firebase', {
      'url' : 'https://didactic-meow.firebaseio.com/'
  })

  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('ROUTE1', {
        url: '/',
        templateUrl: '',
        controller: '',
        resolve: {

        }
      })
      .state('ROUTE2', {
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {

        }
      })
      .state('ROUTE3', {
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {

        }
      })
      .state('ROUTE4', {
        url: '',
        templateUrl: '',
        controller: '',
        resolve: {

        }
      })
  })
