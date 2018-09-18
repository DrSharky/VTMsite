var app = angular.module("site");

app.controller("SaveController", [ 'SaveService', function(SaveService){

  this.saveCharacter = saveCharacter;
  function saveCharacter(){
    SaveService.saveCharacter();
  }

}]);
