var app = angular.module('navbar', [ ]);
app.controller('NavbarController',
  ['$scope', '$location', function($scope, $location){
    $scope.navClass = function(page){
      var currentRoute = $location.path().substring(1) || 'home';
      return page === currentRoute ? 'active' : '';
    };

    $scope.loadHome = function(){
      $location.url('home');
    };
    $scope.loadCreator = function(){
      $location.url('creator');
    };
  }]);
