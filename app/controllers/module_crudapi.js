var app = angular.module('module_crudapi', ['ngResource']);

app.factory('Bycycle', function($resource) {
  //error server "\xA4" ASCII-8BIT to UTF-8
  //fails convert from ascii to utf
  //use window.btoa() , this method will Creates a base-64 encoded ASCII string from a "string" of binary data
  //because in api server only know this encode (if send via header)
  var auth = window.btoa("dwikuntobayu" + ':' + "12345678");

  return $resource('', {}, {
    'index' : {
      method : 'GET',
      url : 'http://localhost:3003/api/v1/bycycles',
      isArray : false
    },
    'save' : {
      method : 'POST',
      url : 'http://localhost:3003/api/v1/bycycles',
      isArray : false,
      // params: {username:'dwikuntobayu', password:'12345678'},
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      }
    },
    'destroy' : {
      method : 'DELETE',
      url : 'http://localhost:3003/api/v1/bycycles/:id',
      isArray : false,
      params : {
        id : '@id'
      }
    }
  });
});

var app_bycycle = angular.module('bycycle_module', ['module_crudapi']);

app_bycycle.controller('bycycle_controller', function($scope, Bycycle) {
  $scope.bycycles = Bycycle.save();
});

//
// app.controller('myCtrl', function($scope, $http) {
// $http.get("http://localhost:3003/").then(function(response) {
// $scope.myWelcome = response.data;
// });
// });

// angular.module('bycyclesExample', []).controller(function($scope, $http) {
// $http.get('http://localhost:3003/api/v1/bycycles').success(function(data) {
// $scope.bycycles = data;
// });
// $scope.save = function(bycycle) {
// $http.update('http://localhost:3003/api/v1/bycycles' + bycycle.id, bycycle);
// };
// $scope.destroy = function(bycycle) {
// $http.destroy('http://localhost:3003/api/v1/bycycles' + bycycle.id);
// };
// }); 