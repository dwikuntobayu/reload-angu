'use strict';

//declare app level module which depends on filters, and services
var app = angular.module('loginSeed', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: '/partials/login.html'
  });
  $routeProvider.otherwise({
    redirectTo: '/login'
  });
}]);
