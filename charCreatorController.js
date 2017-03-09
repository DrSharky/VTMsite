var app = angular.module("site");

app.controller("CharCreatorController", function(){


  this.charPlayer = null;
  this.charChronicle = null;
  this.charName = null;
  this.charConcept = null;
  this.charNature = null;
  this.charDemeanor = null;
  this.charGeneration = "13th";
  this.charSire = null;

  this.primaryAttr = 7;
  this.secondaryAttr = 5;
  this.tertiaryAttr = 3;

  this.primaryAb = 13;
  this.secondaryAb = 9;
  this.tertiaryAb = 5;

  this.disciplinePts = 3;
  this.backgroundPts = 5;
  this.virtuePts = 7;
  this.freePts = 15;

  this.maxFreePts = 22;
  this.maxFlawBonus = 7;

  this.generations = ["3rd", "4th", "5th", "6th", "7th",
                      "8th", "9th", "10th", "11th", "12th",
                      "13th", "14th", "15th"];

  class Abilities
  {
    constructor()
    {
      this.points = [{id:0, img:"/empty.png"},
                     {id:1, img:"/empty.png"},
                     {id:2, img:"/empty.png"},
                     {id:3, img:"/empty.png"},
                     {id:4, img:"/empty.png"}];
    }
  };

});
