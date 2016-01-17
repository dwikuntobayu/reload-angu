// setup module with name 'module_app'
var app = angular.module('module_app', []);
// controller for hold a data user
app.controller('ctrl_user', function($scope) {
  $scope.full_name = "M Dwikuntobayu";
  $scope.age = "26";
});
// controller for hold array scores
app.controller('ctrl_scores', function($scope) {
  $scope.scores = [32, 54, 66, 72, 88, 102];
});
// http://stackoverflow.com/questions/20018507/angularjs-what-is-the-need-of-the-directives-link-function-when-we-already-had
// directive use for create template
// name directive cannot sparate with dash or underscore
app.directive("helloearth", function() {
  return {
    template : "evl is take time and slowly like river"
  };
});
