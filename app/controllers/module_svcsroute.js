angular.module('app', ['app.services', 'app.controllers']);

var moduleCtrl = angular.module('app.controllers', []);
moduleCtrl.controller('myCtrl', function($scope, cstService) {
  var player = new cstService('kunto');
  $scope.player_one = player.getName();
});

var moduleSrvcs = angular.module('app.services', []);
moduleSrvcs.factory('cstService', function() {
  var ServiceClass = function(thename) {
    this.name = thename;
    this.getName = function() {
      return this.name;
    };
  };
  return ServiceClass;
}); 