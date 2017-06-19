var app = angular.module("site");

app.controller("LoadController", ['LoadService', function(LoadService){


  this.loadClick = loadClick;
  function loadClick(){
    LoadService.loadClick("Sharky");
  }

  this.loadChars = loadChars;
  function loadChars(){
    LoadService.loadChars();
  }

  this.userCharacters = userCharacters();
  function userCharacters(){
    return LoadService.userCharacters;
  }
}]);
