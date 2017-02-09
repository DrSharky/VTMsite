(function(){
  var app = angular.module("site", ["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider
    .when("/home",{
      templateUrl: "home.html",
      controller: "HomeController as home"
    })
    .when("/creator",{
      templateUrl: "creator.html",
      controller: "CharCreatorController"
    })
    .otherwise({redirectTo:"/home"});
});

}());
