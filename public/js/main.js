(function(){
  var app = angular.module('GetSomeSleep', ["ngRoute"]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: '/home.html',   controller: 'IndexCtrl'})
    .when('/configure', {templateUrl: '/configure.html',   controller: 'ConfigureCtrl'})
    .otherwise({redirectTo: '/'});
  }]);

  app.controller('IndexCtrl', ['$scope', '$route','$routeParams',
  function($scope, $route, $routeParams){
    console.log("route", $route);

    console.log("IndexCtrl");

  }]);

  app.controller('ConfigureCtrl', ['$scope', '$route','$routeParams',
  function($scope, $route, $routeParams){
    console.log("route", $route);
    console.log('ConfigureCtrl');
    this.params = $routeParams;




  }]);




})();
