var app = angular.module("site");
app.service('UglyService', function(){

  this.currentClan = null;
  this.previousClan = null;
  this.dirtyBit = false;
  this.uglyList = ['Gargoyles', 'Harbingers of Skulls', 'Nosferatu', 'Samedi'];

  this.setClan = function(clan){
    this.previousClan = this.currentClan;
    this.currentClan = clan.name;
    this.dirtyBit = true;
  };

  this.isUgly = function(){
    if(this.uglyList.includes(this.currentClan))
      return true;
    else
      return false;
  };

  this.previousUgly = function(){
    if(this.uglyList.includes(this.previousClan))
      return true;
    else
      return false;
  };

  this.isGargoyle = function(){
    if(this.currentClan == 'Gargoyles')
      return true;
    else
      return false;
  };

});
