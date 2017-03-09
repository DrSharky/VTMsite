(function(){
  var app = angular.module("site", ["ngRoute"]);

  app.controller("NavController", function($location){
    this.isActive = function(viewLocation){
      return viewLocation === $location.path();
    }
  });


  app.config(function($routeProvider, $locationProvider){
    $routeProvider
      .when("./home",{
        templateUrl: "home.html",
        controller: "HomeController as HomeCtrl"
      })
      .when("./creator",{
        templateUrl: "creator.html",
        controller: "CharCreatorController as creatorCtrl"
      })
      .otherwise({redirectTo:"./home"});
      $locationProvider.html5Mode(true);
    });
  }()
);
