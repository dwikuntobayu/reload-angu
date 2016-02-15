//// Setup routes for hande redirect and reload page
var moduleRoutes = angular.module('modroutes', ['ngRoute', 'ngCookies', 'ngStorage']);

moduleRoutes.controller('ctrlMain', function($scope, $route, $routeParams, $location){
  $scope.$route = $route;
  $scope.$location = $location;
  $scope.$routeParams = $routeParams;
});

moduleRoutes.controller('ctrlSvcsTwo', function($scope, $routeParams, $cookies, $localStorage, $sessionStorage) {
  $scope.name = "Me from controller ctrlSvcsTwo";
  $scope.params = $routeParams;
  $scope.token = $cookies.get('token');
  $scope.storage = $localStorage;
});

moduleRoutes.controller('ctrlSvcsThree', function($scope, $routeParams, $cookies, $localStorage, $sessionStorage) {
  $scope.name = "Me from controller ctrlSvcsThree";
  $scope.params = $routeParams;
  $cookies.remove('token');
  $localStorage.$reset();
  $sessionStorage.$reset();
});

moduleRoutes.config(function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'index.html'
  })
  //// make sure add '/' at first route name and templateUrl
  .when('/svcs-two', {
    templateUrl: '/svcs-two.html',
    controller: 'ctrlSvcsTwo'
  })
  .when('/svcsthree/:id', {
    templateUrl: '/svcs-three.html',
    controller: 'ctrlSvcsThree'
  });
  // .otherwise({redirectTo: '/'});

  //// configure html5 to get links working on jsfiddle
  //// if only use below code route will cause error require base tag
  //// $locationProvider.html5Mode(true);
  //// this code is working
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});