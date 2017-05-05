var app = angular.module("site");

app.service('CharCreatorService',function(){
  this.freebiePts = 15;
  this.freebieMode = false;

  this.getFreebiePts = function(){
    return this.freebiePts;
  }
  this.changeFreebiePts = changeFreebiePts;
  this.toggleFreebieMode = toggleFreebieMode;

  function changeFreebiePts(addPts){
    this.freebiePts += addPts;
  }
  function toggleFreebieMode(){
    this.freebieMode = !this.freebieMode;
  }
});
