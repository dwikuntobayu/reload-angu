var app = angular.module('module_crudapi', ['ngResource']);

// // this for handle global error message
// // the problem is when error happend this method not catch directly
// // so the error was happen then this message will be called
// app.config(function($provide, $httpProvider) {
// $provide.factory('ErrorInterceptor', function($q) {
// return {
// responseError : function(rejection) {
// console.log(rejection);
// return $q.reject(rejection);
// }
// };
// });
//
// $httpProvider.interceptors.push('ErrorInterceptor');
// });

//create services for access api with resource
app.factory('Bycycle', function($resource) {
  //auth error server "\xA4" ASCII-8BIT to UTF-8
  //fails convert from ascii to utf
  //use window.btoa() , this method will Creates a base-64 encoded ASCII string from a "string" of binary data
  //because in api server only know this encode (if send via header)
  var auth = window.btoa("dwikuntobayu" + ':' + "12345678");
  var base_url = 'http://localhost:3003';

  return $resource('', {}, {
    'index' : {
      method : 'GET',
      url : base_url + '/api/v1/bycycles',
      isArray : false,
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      }
    },
    'show' : {
      method : 'GET',
      url : base_url + '/api/v1/bycycles/:id',
      isArray : false,
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      },
      params : {
        id : '@id'
      }
    },
    'save' : {
      method : 'POST',
      url : base_url + '/api/v1/bycycles',
      isArray : false,
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      },
      params : {
        name : '@name',
        series : '@series'
      }
    },
    'update' : {
      method : 'PUT',
      url : base_url + '/api/v1/bycycles/:id',
      isArray : false,
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      },
      params : {
        id : '@id',
        name : '@name',
        series : '@series'
      }
    },
    'destroy' : {
      method : 'DELETE',
      url : base_url + '/api/v1/bycycles/:id',
      isArray : false,
      headers : {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type' : 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
      },
      params : {
        id : '@id'
      }
    }
  });
});

var app_bycycle = angular.module('bycycle_module', ['module_crudapi']);
app_bycycle.controller('bycycle_controller', function($scope, Bycycle) {
  $scope.bycycle = {};
  $scope.save_bycycle = function() {
    $scope.bycycles = Bycycle.save({
      name : $scope.bycycle.name,
      series : $scope.bycycle.series
    });
  };
  $scope.list_bycycles = function() {
    $scope.bycycles = Bycycle.index();
  };
  $scope.show_bycycle = function() {
    $scope.bycycles = Bycycle.show({
      id : $scope.bycycle.id
    });
  };
  $scope.update_bycycle = function() {
    $scope.bycycles = Bycycle.update({
      id : $scope.bycycle.id,
      name : $scope.bycycle.name,
      series : $scope.bycycle.series
    });
  };
  $scope.delete_bycycle = function() {
    if ($scope.bycycle.id == null) {
      $scope.bycycle.id = 0;
    }
    $scope.bycycles = Bycycle.destroy({
      id : $scope.bycycle.id
    });
    // // this will catch error
    // // but error will happend first then this handle will called
    //.$promise.then(function(data) {
    // // success handler
    // }, function(error) {
    // // error handler
    // console.log(error);
    // });
  };
  // $scope.bycycles = Bycycle.save({name: "Recon 1", series: "xc-rc1"});
  // $scope.bycycles = Bycycle.index();
  // $scope.bycycles = Bycycle.show({id: 1});
  // $scope.bycycles = Bycycle.update({id: 1, name: "Recon 2", series: "xc-rc2"});
  // $scope.bycycles = Bycycle.destroy({id: 1});
});

var http_module = angular.module('httpExample', []);
http_module.controller('httpBycycle', function($scope, $http) {
  var auth = window.btoa("dwikuntobayu" + ':' + "12345678");
  var base_url = 'http://localhost:3003';
  $scope.bycycle = {};
  $scope.index = function() {
    $http.get('http://localhost:3003/api/v1/bycycles').success(function(data) {
      $scope.bycycles = data;
    });
  };
  $scope.show = function() {
    $http.get('http://localhost:3003/api/v1/bycycles/' + $scope.bycycle.id).success(function(data) {
      $scope.bycycles = data;
    });
  };
  $scope.save = function() {
    $http.post('http://localhost:3003/api/v1/bycycles', $scope.bycycle).success(function(data) {
      $scope.bycycles = data;
    });
  };
  $scope.update = function() {
    $http.put('http://localhost:3003/api/v1/bycycles/' + $scope.bycycle.id, $scope.bycycle).success(function(data) {
      $scope.bycycles = data;
    });
  };
  $scope.delete = function() {
    $http.delete('http://localhost:3003/api/v1/bycycles/' + $scope.bycycle.id).success(function(data) {
      $scope.bycycles = data;
    });
  };
}); 