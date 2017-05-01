(function(){
  var app = angular.module("site", ["ngRoute", "ngTable"]);

  app.controller("NavController", function($location){
    this.isActive = function(viewLocation){
      return viewLocation === $location.path();
    }
  });

  app.config(function($routeProvider){
    $routeProvider
      .when("/home",{
        templateUrl: "home.html",
        controller: "HomeController as HomeCtrl"
      })
      .when("/creator",{
        templateUrl: "charCreator.html",
        controller: "CharCreatorController as creatorCtrl"
      })
      .otherwise({redirectTo:"/home"});
    });
  }()
);
