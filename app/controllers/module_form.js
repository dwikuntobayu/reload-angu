var app = angular.module('module_form', []);
//implement angular form controll & angular filter
app.controller('process_form', function($scope) {
  $scope.saved = {};
  $scope.save_data = function(user) {
    $scope.saved = angular.copy(user);
  };
  $scope.retrive_data = function() {
    $scope.user = angular.copy($scope.saved);
  };
  $scope.retrive_data();
});

//=======
// Custom Validation input form
//=======
// https://regex101.com
var NAME_REGEXP = /^[a-zA-Z.\s]*$/;
var EMAIL_REGEXP = /^(([a-zA-Z]|[0-9])|([-]|[_]|[.]))+[@](([a-zA-Z0-9])|([-])){2,63}[.](([a-zA-Z0-9]){2,63})+$/;
var URL_REGEXP = /^\(?(?:(http|https):\/\/)(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?$/;
var AGE_REGEXP = /^[^.0-][\d]+$/;
// validation for name
app.directive('validname', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.validname = function(modelValue, viewValue) {
        var value = modelValue || viewValue;
        if (ctrl.$isEmpty(value)) {
          // consider empty models to be valid
          return true;
        }
        if (NAME_REGEXP.test(value)) {
          // it is valid
          return true;
        }
        // it is invalid
        return false;
      };
    }
  };
});

// validation for email
app.directive('validemail', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.validemail = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          //consider empty model to be valid
          return true;
        }
        if (EMAIL_REGEXP.test(viewValue)) {
          //it is valid
          return true;
        }
        //it is invalid
        return false;
      };
    }
  };
});

// validation for url
app.directive('validurl', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.validurl = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          //consider empty model to be valid
          return true;
        }
        if (URL_REGEXP.test(viewValue)) {
          //it is valid
          return true;
        }
        //it is invalid
        return false;
      };
    }
  };
});

// validation for age
app.directive('validage', function() {
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.validage = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          //consider empty model to be valid
          return true;
        }
        if (AGE_REGEXP.test(viewValue)) {
          //it is valid
          return true;
        }
        //it is invalid
        return false;
      };
    }
  };
});