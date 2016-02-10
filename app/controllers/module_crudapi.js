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

////==========================================
//// Access API data with resources library
//// create service with factory then inject to controller
////==========================================
//create services for access api with resource
app.factory('Bycycle', function($resource) {
  //auth error server "\xA4" ASCII-8BIT to UTF-8
  //fails convert from ascii to utf
  //use window.btoa() , this method will Creates a base-64 encoded ASCII string from a "string" of binary data
  //because in api server only know this encode (if send via header)
  var auth = window.btoa("dwikuntobayu" + ':' + "12345678");
  var base_url = 'http://localhost:3003/';

  function resRequest(methodType, subDomain) {
    return {
      method : methodType,
      url : base_url + subDomain,
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
    };
  }

  return $resource('', {}, {
    'index' : resRequest('GET', 'api/v1/bycycles'),
    'show' : resRequest('GET', 'api/v1/bycycles/:id'),
    'save' : resRequest('POST', 'api/v1/bycycles'),
    'update' : resRequest('PUT', 'api/v1/bycycles/:id'),
    'destroy' : resRequest('DELETE', 'api/v1/bycycles/:id'),
  });
});

//// create controller that injected services
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
  };
  // $scope.bycycles = Bycycle.save({name: "Recon 1", series: "xc-rc1"});
  // $scope.bycycles = Bycycle.index();
  // $scope.bycycles = Bycycle.show({id: 1});
  // $scope.bycycles = Bycycle.update({id: 1, name: "Recon 2", series: "xc-rc2"});
  // $scope.bycycles = Bycycle.destroy({id: 1});
});

////==========================================
//// Access API data with http method
////==========================================
var http_module = angular.module('httpExample', []);
http_module.controller('httpBycycle', function($scope, $http) {
  var auth = window.btoa("dwikuntobayu" + ':' + "12345678");
  var base_url = 'http://localhost:3003/';
  $scope.bycycle = {};

  function httpRequest(methodType, subDomain, inputData) {
    return {
    method: methodType,
    url: base_url + subDomain,
      headers: {
        'Authorization' : 'Basic ' + auth,
        'Accept' : 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Headers' : 'Origin, X-Requested-With, Content-Type, Accept'
       },
       data: inputData
    };
  }

  $scope.save = function() {
    $http(httpRequest('POST', 'api/v1/bycycles', $scope.bycycle)).then(
      function (resSuccess){
        $scope.bycycles = resSuccess.data;
      },
      function (resError){
        console.log(resError);
      }
    );
  };

  $scope.index = function() {
    $http(httpRequest('GET', 'api/v1/bycycles')).then(
      function (resSuccess){
        $scope.bycycles = resSuccess.data;
      },
      function (resError){
        console.log(resError);
      }
    );
  };

  $scope.show = function() {
    $http(httpRequest('GET', 'api/v1/bycycles/' + $scope.bycycle.id)).then(
      function (resSuccess){
        $scope.bycycles = resSuccess.data;
      },
      function (resError){
        console.log(resError);
      }
    );
  };

  $scope.update = function() {
    $http(httpRequest('PUT', 'api/v1/bycycles/' + $scope.bycycle.id, $scope.bycycle)).then(
      function (resSuccess){
        $scope.bycycles = resSuccess.data;
      },
      function (resError){
        console.log(resError);
      }
    );
  };

  $scope.delete = function() {
    $http(httpRequest('DELETE', 'api/v1/bycycles/' + $scope.bycycle.id)).then(
      function (resSuccess){
        $scope.bycycles = resSuccess.data;
      },
      function (resError){
        console.log(resError);
      }
    );
  };

}); 