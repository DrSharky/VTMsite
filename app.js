(function(){
  var app = angular.module("site", ["ngRoute", "ngTable", "termIndex", "firebase"]);

  app.controller("NavController", function($location){
    this.isActive = function(viewLocation){
      return viewLocation === $location.path();
    }
  });

  app.config(function($routeProvider){
    $routeProvider
      .when("/home",{
        templateUrl: "./home/home.html",
        controller: "HomeController as HomeCtrl"
      })
      .when("/creator",{
        templateUrl: "./char_creator/charCreator.html",
        controller: "CharCreatorController as creatorCtrl"
      })
      .when("/register",{
        templateUrl: "./register/register.html",
        controller: "RegisterController as registerCtrl"
      })
      .otherwise({redirectTo:"/home"});
    });
  }()
);
