(function(){
  var app = angular.module("site", ["ngRoute", "ui.router"]);

  app.controller("NavController", function($location){
    this.isActive = function(viewLocation){
      return viewLocation === $location.path();
    }
  });

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state("home",{
        url: "/home",
        templateUrl: "home.html",
        controller: "HomeController as HomeCtrl"
      })
      .state("creator",{
        url: "/creator",
        templateUrl: "creator.html",
        controller: "CharCreatorController as creatorCtrl"
      });
      // .otherwise({redirectTo:"/home"});
      $urlRouterProvider.otherwise("/home");
      $locationProvider.html5Mode(true);

    });
  }()
);
