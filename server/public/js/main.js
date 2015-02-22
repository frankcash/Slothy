(function(){
  var app = angular.module('GetSomeSleep', ["ngRoute"]);

  app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: '/home.html', controller: 'IndexCtrl'})
    .when('/configure/:token/:secret', {templateUrl: '/configure.html',   controller: 'ConfigureCtrl'})
    .otherwise({redirectTo: '/'});
  }]);

  app.controller('IndexCtrl', ['$scope', '$route','$routeParams',
  function($scope, $route, $routeParams){
    console.log("route", $route);
    console.log("IndexCtrl");

  }]);

  app.controller('ConfigureCtrl', ['$scope', '$route','$routeParams', '$http',
  function($scope, $route, $routeParams, $http){ // http://goo.gl/oa3Kzq
    console.log("route", $route);
    console.log('ConfigureCtrl');
    this.params = $routeParams;

    $scope.submit = function(){
      this.params = $routeParams;
      console.log("account name: ", $scope.userName);
      console.log("params: ", this.params);


      // TODO: HTTP POST
      if ($scope.userName) {
        $http.post('/create_account', {name: $scope.userName, token: this.params.token, secret: this.params.secret})
        .success(function(data, status, headers, config) {
          console.log('success');
        }).error(function(data, status, headers,config){
          console.log('error');
        })
      }
    }

  }]);




})();
