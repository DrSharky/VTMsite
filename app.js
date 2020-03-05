(function(){
  var app = angular.module("site", ["ngRoute", "ngTable", "termIndex", "firebase", "pascalprecht.translate"]);

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
      .when("/freecreator",{
        templateUrl: "./free_creator/freeCreator.html",
        controller: "CharCreatorController as creatorCtrl"
      })
      .when("/glossary",{
        templateUrl: "./glossary/glossary.html",
        controller: "GlossaryController as glossCtrl"
      })
      .otherwise({redirectTo:"/home"});
    });
  }()
);
