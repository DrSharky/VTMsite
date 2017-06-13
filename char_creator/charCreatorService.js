var app = angular.module("site");

app.factory('charFactory', function($q){
  var svc = {};
  svc.charPlayer = ["AAA"];

  svc.getDataStream = function(){
    var fakeData = ["TEST"];

    return $q.when(fakeData)
    .then(function(data){
      angular.copy(data, svc.charPlayer);
    });
  };

  return svc;

});

app.service('CharCreatorService', [function(){

  this.freebiePts = 15;
  this.freebieMode = false;

  this.charPlayer = null;
  this.charChronicle = null;
  this.charName = null;
  this.charConcept = null;
  this.charNature = null;
  this.charDemeanor = null;
  this.charGeneration = "13th";
  this.charSire = null;

  this.getPlayer = function(){
    return this.charPlayer;
  }

  this.generations = ["3rd", "4th", "5th", "6th", "7th",
                      "8th", "9th", "10th", "11th", "12th",
                      "13th", "14th", "15th"];

  this.getFreebiePts = function(){
    return this.freebiePts;
  }
  this.changeFreebiePts = changeFreebiePts;
  this.toggleFreebieMode = toggleFreebieMode;

  function changeFreebiePts(addPts){
    this.freebiePts += addPts;
  }

  function toggleFreebieMode(){
    if(this.freebiePts < 15){
      return;
    }
    this.freebieMode = !this.freebieMode;
  }
}]);
