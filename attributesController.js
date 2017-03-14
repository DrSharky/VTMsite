var app = angular.module("site");

app.controller("AttributesController", function($scope, UglyService){

  this.categoryChange = categoryChange;
  this.selectAttribute = selectAttribute;
  this.getPriority = getPriority;
  this.getPriorityPts = getPriorityPts;
  this.getCategoryIndex = getCategoryIndex;
  this.attributePriorities = ["Primary", "Secondary", "Tertiary"];
  this.attributesPage = "./attributes.html";
  this.attributePtsTotal = 15;
  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;
  this.selectedPriorities = [null, null, null];

  class Attributes {
    constructor(name){
      this.name = name;
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png"},
                     {id:1, img:"./empty.png"},
                     {id:2, img:"./empty.png"},
                     {id:3, img:"./empty.png"},
                     {id:4, img:"./empty.png"}];

      this.reset = function(){
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.id == 0)
            point.img = "./full.png";
          else
            point.img = "./empty.png";
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

  this.strength = new Attributes("strength");
  this.dexterity = new Attributes("dexterity");
  this.stamina = new Attributes("stamina");
  this.charisma = new Attributes("charisma");
  this.manipulation = new Attributes("manipulation");
  this.appearance = new Attributes("appearance");
  this.perception = new Attributes("perception");
  this.intelligence = new Attributes("intelligence");
  this.wits = new Attributes("wits");

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

function getPriority(attribute){
  if(attribute == "strength" || attribute == "dexterity" || attribute == "stamina"){
    return this.selectedPriorities[0];
  }
  if(attribute == "charisma" || attribute == "manipulation" || attribute == "appearance"){
    return this.selectedPriorities[1];
  }
  if(attribute == "perception" || attribute == "intelligence" || attribute == "wits"){
    return this.selectedPriorities[2];
  }
}

function getPriorityPts(priority){
  switch(priority){
    case "Primary":
      return this.primaryPts;
      break;
    case "Secondary":
      return this.secondaryPts;
      break;
    case "Tertiary":
      return this.tertiaryPts;
      break;
    default:
      break;
  }
}

function getCategoryIndex(attribute){
  if(attribute == "strength" || attribute == "dexterity" || attribute == "stamina"){
    return 0;
  }
  if(attribute == "charisma" || attribute == "manipulation" || attribute == "appearance"){
    return 1;
  }
  if(attribute == "perception" || attribute == "intelligence" || attribute == "wits"){
    return 2;
  }
}

function selectAttribute(attribute, index){

  //Sum the pointCount of each attribute in the category, THEN subtract.
  //Keep in case a bug pops up, but I think this is fixed.
  // var catIndex = this.getCategoryIndex(attribute.name);
  // var sumPointCount = -3;
  // this.attributeCategories[catIndex].attributes.forEach(function(attribute){
  //   sumPointCount += attribute.pointCount;
  // });

  var priority = this.getPriority(attribute.name);
  var priorityPts = this.getPriorityPts(priority);
  var pointDiff = attribute.pointCount - (index+1);

  //Do math to make sure they can't spend points they don't have, even when priorityPts isn't equal to 0
  //Case example: increase 3 pts when priorityPts = 2.
  if((priorityPts+pointDiff < 0)){
    return null;
  }

  //Don't let the user spend points they don't have!
  if(priorityPts <= 0 && pointDiff < 0)
  {
    return null;
  }

  //Change the point count in the attribute.
  attribute.pointCount = (index+1);

  //Change the total amount of points still available for that category.
  switch(priority){
    case "Primary":
      this.primaryPts += pointDiff;
      break;
    case "Secondary":
      this.secondaryPts += pointDiff;
      break;
    case "Tertiary":
      this.tertiaryPts += pointDiff;
      break;
    default:
      break;
  }
  //Fill in the dots!
  attribute.select(index);
};

function categoryChange(changedCategory, id, prevCategory){
  this.attributeCategories[id].priority = changedCategory;
  for(var i = 0; i < this.selectedPriorities.length; i++){
    if(changedCategory == this.selectedPriorities[i] && id != i){
      this.selectedPriorities[i] = null;
      this.attributeCategories[i].attributes.forEach(function(attr){
        attr.reset();
      });
    }
  }
    //Reset the dots.
    this.attributeCategories[id].attributes.forEach(function(attr){
      attr.reset();

    });
    //Reset the point values.
    if(prevCategory == "Primary"){
      this.primaryPts = 7;
    }
    if(prevCategory == "Secondary"){
      this.secondaryPts  = 5;
    }
    if(prevCategory == "Tertiary"){
      this.tertiaryPts = 3;
    }
};

});
