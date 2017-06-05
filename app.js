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
        controller: "HomeController as HomeCtrl",
        resolve: {
          "currentAuth" : ["LoginService", function(LoginService){
            return LoginService.loggedIn();
          }]
        }
      })
      .when("/creator",{
        templateUrl: "./char_creator/charCreator.html",
        controller: "CharCreatorController as creatorCtrl",
        resolve: {
          "currentAuth" : ["LoginService", function(LoginService){
            return LoginService.loggedIn();
          }]
        }
      })
      // .when("/login",{
      //   templateUrl: "./login/login.html",
      //   controller: "LoginController as loginCtrl"
      // })
      .otherwise({redirectTo:"/home"});
    });
  }()
);
