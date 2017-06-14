var app = angular.module("site");

app.controller("LoadController", ['LoadService', function(LoadService){


  this.loadClick = loadClick;
  function loadClick(){
    LoadService.loadClick("Sharky");
  }
}]);
