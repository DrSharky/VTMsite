(function(){
  var app = angular.module('site', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider

    .when('/', {
      templateUrl: 'pages/home.html',
      controller:  'SiteController'
    })
    .when('/creator', {
      templateUrl: 'pages/creator.html',
      controller:  'CharCreatorController'
    });
  });

  app.controller('SiteController', function($scope){
    $scope.message = 'Hello!';
	});
})();
