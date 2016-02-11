angular.module('app', ['app.services', 'app.controllers']);

var moduleCtrl = angular.module('app.controllers', []);
moduleCtrl.controller('myCtrl', function($scope, cstService) {
  $scope.player_one = {};
  $scope.player_two = {};
  var player_one = new cstService();
  var player_two = new cstService();
  player_one.setName('kunto');
  player_two.setName('bayu');
  $scope.player_one.name = player_one.getName();
  $scope.player_two.name = player_two.getName();
  $scope.player_one.blood = player_one.getBlood();
  $scope.player_two.blood = player_two.getBlood();

  $scope.attack = function() {
    var result;
    if (player_one.blood <= 0) {
      $scope.player_one.blood = 0;
      result = statusGame();
    }
    if (player_two.blood <= 0) {
      $scope.player_two.blood = 0;
      result = statusGame();
    }
    if (result) return;
    if ($scope.target == "kunto") {
      player_two.blood = player_two.blood - 40;
      $scope.player_two.blood = player_two.blood;
    } else if ($scope.target == "bayu") {
      player_one.blood = player_one.blood - 40;
      $scope.player_one.blood = player_one.blood;
    } else {
      $scope.target = "User not found";
    }
  };

  function statusGame() {
    if (confirm("GAME OVER\nWana Play again") == true) {
      window.location.reload();
    } else {
      return true;
    }
  }
});

var moduleSrvcs = angular.module('app.services', []);
moduleSrvcs.factory('cstService', function() {
  function hero(baseName) {
    this.name = baseName;
    this.blood = 200;
    this.setName = function(name) {
      this.name = name;
    };
    this.getName = function() {
      return this.name;
    };
    this.setBlood = function(blood) {
      this.blood = blood;
    };
    this.getBlood = function() {
      return this.blood;
    };
  };
  return hero;
});

