var app = angular.module("site");

app.service('CharCreatorService',function(){
  this.freebiePts = 15;
  this.freebieMode = true;

  this.getFreebiePts = function(){
    return this.freebiePts;
  }
  this.changeFreebiePts = changeFreebiePts;
  this.setFreebieMode = setFreebieMode;

  function changeFreebiePts(addPts){
    this.freebiePts += addPts;
  }
  function setFreebieMode(mode){
    this.freebieMode = mode;
  }
});
