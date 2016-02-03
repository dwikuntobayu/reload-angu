var app = angular.module('module_crudapi', ['ngResource']);

//create services for access api with resource
app.factory('Bycycle', function($resource) {
  //error server "\xA4" ASCII-8BIT to UTF-8
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
  // $scope.bycycles = Bycycle.save({name: "Recon 1", series: "xc-rc1"});
  $scope.bycycles = Bycycle.index();
  // $scope.bycycles = Bycycle.show({id: 1});
  // $scope.bycycles = Bycycle.update({id: 9, name: "Recon 2", series: "xc-rc2"});
  // $scope.bycycle = Bycycle.destroy({id: 9});
});

app_bycycle.directive('showbycycle', function() {
  return {
    template: 'Name : {{ bycycles.bycyle.name }} <br /> Series : {{ bycycles.bycycle.series }}'
  };
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