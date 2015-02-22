(function(){
  var app = angular.module('GetSomeSleep', ["ngRoute"]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: '/home.html',   controller: 'IndexCtrl'})
    .when('/configure/:token/:secret', {templateUrl: '/configure.html',   controller: 'ConfigureCtrl'})
    .otherwise({redirectTo: '/'});
  }]);

  app.controller('IndexCtrl', ['$scope', '$route','$routeParams',
  function($scope, $route, $routeParams){
    console.log("route", $route);
    console.log("IndexCtrl");

  }]);

  app.controller('ConfigureCtrl', ['$scope', '$route','$routeParams',
  function($scope, $route, $routeParams){ // http://goo.gl/oa3Kzq
    console.log("route", $route);
    console.log('ConfigureCtrl');
    this.params = $routeParams;
    console.log("params", this.params);

    $scope.register = function(){
      console.log($scope.accountName);
    }


  }]);




})();
