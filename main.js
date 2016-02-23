// App module
var ElasticApp = angular.module('ElasticApp', ['nvd3', 'ui.router', 'ElasticApp.config']);

ElasticApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: './views/partial-home.html'
      })

      .state('state', {
        url: '/state',
        templateUrl: './views/toilets-state-panel.html'
      })

      .state('shower', {
        url: '/shower',
        templateUrl: './views/shower-state-panel.html'
      })

      .state('search', {
        url: '/search',
        templateUrl: './views/search.html'
      })

      .state('search.results', {
        url: "/results",
        templateUrl: "search.results.html",
        controller: function($scope){
          $scope.items = ["A", "List", "Of", "Items"];
        }
      })

      .state('cluster', {
        url: '/cluster',
        templateUrl: './views/state-panel.html'
      });

});
