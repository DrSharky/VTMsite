var app = angular.module("site");

app.controller("AttributesController", function($scope, UglyService){


  this.categoryChange = categoryChange;

  this.attributePriorities = ["Primary", "Secondary", "Tertiary"];
  this.attributesPage = "./attributes.html";

  this.attributePtsTotal = 15;
  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;

  this.selectedPriorities = [null, null, null];


  class Attributes {
    constructor(){
      this.points = [{id:0, img:"./full.png"},
                     {id:1, img:"./empty.png"},
                     {id:2, img:"./empty.png"},
                     {id:3, img:"./empty.png"},
                     {id:4, img:"./empty.png"}];

      this.reset = function(){
        this.points.forEach(function(attribute){
          if(attribute.id == 0)
            attribute.img = "./full.png";
          else
            attribute.img = "./empty.png";
        });
      }

      this.select = function(index){
        if(this.points[index].img=="./full.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              var test = 1;
            }
            else{
              point.img = "./empty.png";
            }
          });
        }
        if(this.points[index].img=="./empty.png")
        {
          this.points.forEach(function(point){
            if(point.id > index){
              var test = 1;
            }
            else{
              point.img = "./full.png";
            }
          });
        }
      };

      this.zero = function(){
        this.points.forEach(function(attribute){
          attribute.img = './empty.png';
        });
      };
    }
  }

  this.strength = new Attributes();
  this.dexterity = new Attributes();
  this.stamina = new Attributes();
  this.charisma = new Attributes();
  this.manipulation = new Attributes();
  this.appearance = new Attributes();
  this.perception = new Attributes();
  this.intelligence = new Attributes();
  this.wits = new Attributes();

  this.attributeCategories = [{id: 0, category: "physical", attributes:[this.strength, this.dexterity, this.stamina], priority:null},
                              {id: 1, category: "social", attributes:[this.charisma, this.manipulation, this.appearance], priority: null},
                              {id: 2, category: "mental", attributes:[this.perception, this.intelligence, this.wits], priority: null}];


this.isUglyClan = function(){
    if(UglyService.isUgly()){
      this.appearance.zero();
      return true;
    }
    else {
      if(UglyService.previousUgly()){
        this.appearance.reset();
        UglyService.previousClan = null;
      }
      return false;
    }
  };


//TODO: Get the point limits to work based on the category priorities.
function selectAttribute(attribute, index){
  switch(attribute){
    case "strength":
      this.strength.select(index);

  }
}

function categoryChange(changedCategory, id){
  this.attributeCategories[id].priority = changedCategory;
  for(var i = 0; i < this.selectedPriorities.length; i++){
    if(changedCategory == this.selectedPriorities[i] && id != i){
      this.selectedPriorities[i] = null;
      this.attributeCategories[i].attributes.forEach(function(attr){
        attr.reset();
      })
    }
  }
};

});
