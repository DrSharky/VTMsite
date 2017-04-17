var app = angular.module("site");
app.service('AttributeService',  ['UglyService', function(UglyService){

  this.priorityChange = priorityChange;
  this.selectAttribute = selectAttribute;
  this.getPriority = getPriority;
  this.getPriorityPts = getPriorityPts;
  this.getCategoryIndex = getCategoryIndex;
  this.isUglyClan = isUglyClan;
  this.resetAttributes = resetAttributes;
  this.resetPriorities = resetPriorities;
  this.priorityNullCheck = priorityNullCheck;
  this.attributePriorities = ["Primary", "Secondary", "Tertiary"];
  this.attributesPage = "./attributes.html";
  this.attributePtsTotal = 15;
  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;
  this.selectedPriorities = [null, null, null];
  var vm = this;

  class Attribute {
    constructor(name){
      this.name = name;
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png"},
                     {id:1, img:"./empty.png"},
                     {id:2, img:"./empty.png"},
                     {id:3, img:"./empty.png"},
                     {id:4, img:"./empty.png"}];

      this.reset = function(){
        vm.attributePtsTotal += (this.pointCount - 1);
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.id == 0)
            point.img = "./full.png";
          else {
            point.img = "./empty.png";
          }
        });
      }

      this.select = function(index){
        if(this.points[index].img=="./full.png")
        {
          this.points.forEach(function(point){
            if(point.id <= index){
              return;
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
              return;
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
    };
  };

  this.strength = new Attribute("Strength");
  this.dexterity = new Attribute("Dexterity");
  this.stamina = new Attribute("Stamina");
  this.charisma = new Attribute("Charisma");
  this.manipulation = new Attribute("Manipulation");
  this.appearance = new Attribute("Appearance");
  this.perception = new Attribute("Perception");
  this.intelligence = new Attribute("Intelligence");
  this.wits = new Attribute("Wits");

  this.attributeCategories = [{id: 0, category: "physical", attributes:[this.strength, this.dexterity, this.stamina], priority:null},
                              {id: 1, category: "social", attributes:[this.charisma, this.manipulation, this.appearance], priority: null},
                              {id: 2, category: "mental", attributes:[this.perception, this.intelligence, this.wits], priority: null}];

  function isUglyClan(){
    if(UglyService.isUgly()){
      if(UglyService.dirtyBit){
        this.resetAttributes();
        this.resetPriorities();
        UglyService.dirtyBit = false;
      }
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

  function resetAttributes(){
    this.attributeCategories.forEach(function(attrCat){
      attrCat.attributes.forEach(function(attr){
        attr.reset();
      });
    });
  }

  function resetPriorities(){
    this.attributeCategories.forEach(function(attrCat){
      attrCat.priority = null;
    });
    this.primaryPts = 7;
    this.secondaryPts = 5;
    this.tertiaryPts = 3;
  }

function getPriority(attribute){
 for(var i = 0; i < this.attributeCategories.length; i++){
   if(this.attributeCategories[i].attributes.indexOf(attribute)!=-1){
     return this.selectedPriorities[i];
   }
 }
}

function priorityNullCheck(attribute){
  if(attribute.name == "strength" || attribute.name == "dexterity" || attribute.name == "stamina"){
    return (this.selectedPriorities[0]!=null);
  }
  if(attribute.name == "charisma" || attribute.name == "manipulation" || attribute.name == "appearance"){
    return (this.selectedPriorities[1]!=null);
  }
  if(attribute.name == "perception" || attribute.name == "intelligence" || attribute.name == "wits"){
    return (this.selectedPriorities[2]!=null);
  }
}

function getPriorityPts(priority){
  // var priority = this.attributeCategories[index].priority;
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

function selectAttribute(attribute, index, catIndex){

  var priority = this.getPriority(attribute);
  if(priority==null){
    return null;
  }
  //TODO: Change  to fix the number displays.
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
  this.attributePtsTotal += pointDiff;
  //Fill in the dots!
  attribute.select(index);
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
