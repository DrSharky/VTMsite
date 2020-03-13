var app = angular.module("site");
app.service('AttributesService', ['UglyService', 'CharCreatorService',
 function(UglyService, CharCreatorService){

  this.loadedCharacter = false;
  this.freeMode = location.hash.includes("free");
  this.freeAttribute = freeAttribute;
  this.priorityChange = priorityChange;
  this.selectAttribute = selectAttribute;
  this.getPriority = getPriority;
  this.getPriorityPts = getPriorityPts;
  this.isUglyClan = isUglyClan;
  this.resetAttributes = resetAttributes;
  this.resetPriorities = resetPriorities;
  this.attributePriorities = ["Primary", "Secondary", "Tertiary"];
  this.attributesPage = "./attributes/attributes.html";
  this.attributePtsTotal = 15;
  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;
  this.selectedPriorities = [null, null, null];
  this.attributesList = {};
  var vm = this;

  class Attribute {
    constructor(name){
      this.name = name;
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png", type: "original"},
                     {id:1, img:"./empty.png", type: ""},
                     {id:2, img:"./empty.png", type: ""},
                     {id:3, img:"./empty.png", type: ""},
                     {id:4, img:"./empty.png", type: ""}];

      this.reset = function(){
        vm.attributePtsTotal += (this.pointCount - 1);
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.type == "freebie"){
            CharCreatorService.changeFreebiePts(5);
          }
          if(point.id == 0){
            point.img = "./full.png";
            point.type = "original";
          }
          else {
            point.img = "./empty.png";
            point.type = "";
          }
        });
      }

      this.select = function(index, type){
        if(this.points[index].img=="./full.png" ||
           this.points[index].img=="./free.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              return;
            }
            else{
              point.img = "./empty.png";
              point.type = "";
            }
          });
        }
        if(this.points[index].img=="./empty.png")
        {
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(type == "freebie" && point.img != "./full.png"){
                point.img = "./free.png";
                point.type = "freebie";
              }
              else{
                point.img = "./full.png";
                point.type = "original";
              }
            }
          });
        }
      };

      this.zero = function(){
        this.points.forEach(function(point){
          point.img = "./empty.png";
          point.type = "";
        });
      };
      if(vm.freeMode){
        this.pointCount = 0;
        this.zero();
      }
    };
  };

  this.strength = new Attribute("Strength");
  this.attributesList.strength = this.strength;
  this.dexterity = new Attribute("Dexterity");
  this.attributesList.dexterity = this.dexterity
  this.stamina = new Attribute("Stamina");
  this.attributesList.stamina = this.stamina;
  this.charisma = new Attribute("Charisma");
  this.attributesList.charisma = this.charisma;
  this.manipulation = new Attribute("Manipulation");
  this.attributesList.manipulation = this.manipulation;
  this.appearance = new Attribute("Appearance")
  this.attributesList.appearance = this.appearance;
  this.perception = new Attribute("Perception");
  this.attributesList.perception = this.perception
  this.intelligence = new Attribute("Intelligence");
  this.attributesList.intelligence = this.intelligence;
  this.wits = new Attribute("Wits");
  this.attributesList.wits = this.wits;

  this.attributeCategories = [
    {
      id: 0,
      category: "physical",
      attributes:[this.strength, this.dexterity, this.stamina],
      priority:null
   },
   {
     id: 1,
     category: "social",
     attributes:[this.charisma, this.manipulation, this.appearance],
     priority: null
   },
   {
     id: 2,
     category: "mental",
     attributes:[this.perception, this.intelligence, this.wits],
     priority: null
   }];

  function isUglyClan(){
    if(UglyService.isUgly()){
      if(UglyService.dirtyBit){
        this.resetAttributes();
        this.resetPriorities();
        UglyService.dirtyBit = false;
      }
      this.appearance.zero();
      this.appearance.pointCount = 0;
      return true;
    }
    else {
      if(UglyService.previousUgly()){
        this.appearance.reset();
        this.appearance.pointCount = 1;
        UglyService.previousClan = null;
      }
      return false;
    }
  };

  function resetAttributes(){
    this.freeMode = location.hash.includes("free");
    if(this.freeMode){
      this.attributeCategories.forEach(function(attrCat){
        attrCat.attributes.forEach(function(attr){
          attr.zero();
          attr.pointCount = 0;
        });
      });
    }
    else{
      this.attributeCategories.forEach(function(attrCat){
        attrCat.attributes.forEach(function(attr){
          attr.reset();
          attr.pointCount = 1;
        });
      });
    }
  };

  function resetPriorities(){
    this.attributeCategories.forEach(function(attrCat){
      attrCat.priority = null;
    });
    this.primaryPts = 7;
    this.secondaryPts = 5;
    this.tertiaryPts = 3;
  };

function getPriority(attribute){
 for(var i = 0; i < this.attributeCategories.length; i++){
   if(this.attributeCategories[i].attributes.indexOf(attribute)!=-1){
     return this.selectedPriorities[i];
   }
 }
};

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
};

function freeAttribute(attribute, index, catIndex){
  if(index == 0 && attribute.pointCount == 1){
    attribute.pointCount = 0;
    attribute.zero();
  }
  else{
    attribute.pointCount = (index+1);
    attribute.select(index, "original");
  }
}

function selectAttribute(attribute, index, catIndex){

  if(attribute.name == "Appearance" && UglyService.isUgly()){
    return null;
  }
  var priority = this.getPriority(attribute);

  if(priority==null){
    return null;
  }

  var priorityPts = 0;
  var pointDiff = 0;

  //Different operations if using Freebie points.
  if(CharCreatorService.freebieMode){

    if(attribute.points[index].type == "original")
      return null;

    priorityPts = CharCreatorService.getFreebiePts();

    if(index < attribute.pointCount - 1)
      pointDiff = (attribute.pointCount * 5) - ((index + 1) * 5);
    if((index == attribute.pointCount-1 && index!=0)){
      pointDiff = (attribute.pointCount * 5) - (index * 5);
      index -= 1;
    }
    else if(index > attribute.pointCount-1)
      pointDiff = ((attribute.pointCount-1) * 5) + (-5 * index);


    if(priorityPts + pointDiff < 0)
      return null;

    CharCreatorService.changeFreebiePts(pointDiff);
    attribute.pointCount = (index+1);
    attribute.select(index, "freebie");
    return;
  }
  else{
     priorityPts = this.getPriorityPts(priority);
     var pointDiff = attribute.pointCount - (index+1);
  }

  //Do math to make sure they can't spend points they don't have, even when
  //priorityPts isn't equal to 0.
  //Case example: increase 3 pts when priorityPts = 2.
  if(priorityPts+pointDiff < 0)
    return null;

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
  this.attributePtsTotal += pointDiff;
  //Fill in the dots!
  attribute.select(index, "original");
};




function priorityChange(changedPriority, id, prevPriority){
  this.attributeCategories[id].priority = changedPriority;
  for(var i = 0; i < this.selectedPriorities.length; i++){
    if(changedPriority == this.selectedPriorities[i] && id != i){
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
    if(prevPriority == "Primary"){
      this.primaryPts = 7;
    }
    if(prevPriority == "Secondary"){
      this.secondaryPts  = 5;
    }
    if(prevPriority == "Tertiary"){
      this.tertiaryPts = 3;
    }
    if(changedPriority == "Primary"){
      this.primaryPts = 7;
    }
    if(changedPriority == "Secondary"){
      this.secondaryPts = 5;
    }
    if(changedPriority == "Tertiary"){
      this.tertiaryPts = 3;
    }
  };

}]);
