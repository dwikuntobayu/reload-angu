// setup module with name 'module_app'
var app = angular.module('module_app', []);

// =========
// Implement of Controller
// =========
// https://docs.angularjs.org/guide/controller
// controller for hold a data user
//http://stackoverflow.com/questions/11605917/this-vs-scope-in-angularjs-controllers
app.controller('ctrl_user', function($scope) {
  $scope.full_name = "M Dwikuntobayu";
  $scope.age = "26";
});
// controller for hold array scores
app.controller('ctrl_scores', function($scope) {
  $scope.scores = [32, 54, 66, 72, 88, 102];
});
// controller with method
app.controller('process_evl', function($scope) {
  $scope.name = 'ratata';
  $scope.to_gladius = function () {
    $scope.name = "sharp";
  };
  $scope.to_golem = function() {
    $scope.name = "strong";
  };
});
// controller with method that have parameter
app.controller('process_bind', function($scope) {
  $scope.base = "flame rock";
  $scope.name = "gerad";
  $scope.combine_with = function(poke) {
    $scope.name = poke;
  };
});
// test inheritance scope base on controller
app.controller('parent_controller', function($scope) {
  $scope.time_of_day = 'morning';
  $scope.temperature = '25C';
});
app.controller('child_controller', function($scope) {
  $scope.time_of_day = 'noon';
});
app.controller('grandchild_controller', function($scope) {
  $scope.temperature = '35C';
});
app.controller('json_array', function($scope) {
  $scope.users = [
    {first: "M", last: "Dwikuntobayu"},
    {first: "M", last: "Lasa"},
    {first: "Hak", last: "Bnwr"},
    {first: "Fare", last: "Maeka"},
    {first: "Jdgh", last: "Msfrt Kute"}
  ];
});

// ===========
// // Implement of Directive
// ===========
// https://docs.angularjs.org/guide/directive
// http://stackoverflow.com/questions/20018507/angularjs-what-is-the-need-of-the-directives-link-function-when-we-already-had
// directive are markers for create attribute, element name, comment or css
// name custom directive cannot sparate with dash or underscore
app.directive("helloearth", function() {
  return {
    // if set replace to true, make sure template block with html tag
    replace: 'true',
    template : "<p>evl is take time and slowly like river</p>"
  };
});
// combination controller and custom directive
app.controller('human', function($scope) {
  $scope.identity = {
    name: 'M Dwikuntobayu',
    age: '26'
  };
})
.directive('mdwikuntobayu', function() {
  return {
    template: 'Name : {{ identity.name }} <br /> Age : {{ identity.age }}'
  };
});
// use link at directive for process scope controller
// this will replace background collor from cyan to grey when click label
app.directive('changecolor', function() {
  return {
    template: '<p style="background-color: {{ color }}">Yo what up, click me</p>',
    link: function(scope, elem, attrs) {
      elem.css('background-color', 'cyan');
      elem.bind('click', function() {
        scope.$apply(function() {
          scope.color = "grey";
        });
      });
      elem.bind('mouseover', function() {
        elem.css('cursor', 'pointer');
      });
    }
  };
});
// load partial page
app.controller('control_ext', function($scope) {
  $scope.customer = {
    name: 'Kunto',
    address: 'Jl. Sukabumi Dalam No. 42/123',
    content: 'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum '
  };
});
app.directive('loadexternal', function() {
  return {
    controller: "control_ext",
    templateUrl: 'title.html'
  };
});
app.directive('loadynamic', function() {
  return {
    controller: "control_ext",
    templateUrl: function(elem, attr) {
      return attr.type+'.html';
    }
  };
});
// load partial with multiple controller
app.controller('multi_controll_one', function($scope) {
  $scope.customer = {
    name: 'Controll 1',
    address: '1600 Aphitheatre'
  };
})
.controller('multi_controll_two', function($scope) {
  $scope.customer = {
    name: 'Controll 2',
    address: 'd21 Microphone'
  };
  $scope.distributor = {
    name: 'Distributor',
    address: 'astro name na'
  };
})
.directive('loadmulticontrol', function() {
  return {
    restrict: 'E',
    templateUrl: 'title.html'
  };
});
// load separate scope from same controller
// make sure in partial view load name customescope
app.controller('multi_scope', function($scope) {
  $scope.customer = {
    name: 'Controll 2',
    address: 'd21 Microphone'
  };
  $scope.distributor = {
    name: 'Distributor',
    address: 'astro name na'
  };
})
.directive('separatescope', function(){
  return {
    restrict: 'E',
    scope: {
      customescope: '=info'
    },
    templateUrl: 'custom-scope.html'
  };
});