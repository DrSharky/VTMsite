var app = angular.module("site");

app.service("AbilitiesService",
['CharCreatorService',
 function(CharCreatorService){

   this.priorityChange = priorityChange;
   this.selectAbility = selectAbility;
   this.getPriority = getPriority;
   this.getPriorityPts = getPriorityPts;
   this.resetAbilities = resetAbilities;
   this.resetPriorities = resetPriorities;
   this.abilityPriorities = ["Primary", "Secondary", "Tertiary"];
   this.abilitiesPage = "./abilities/abilities.html";
   this.abilityPtsTotal = 27;
   this.primaryPts = 13;
   this.secondaryPts = 9;
   this.tertiaryPts = 5;
   this.selectedPriorities = [null, null, null];
   var vm = this;

   class Ability {
     constructor(name){
       this.name = name;
       this.pointCount = 0;
       this.points = [{id: 0, img: "./empty.png", type: ""},
                      {id: 1, img: "./empty.png", type: ""},
                      {id: 2, img: "./empty.png", type: ""},
                      {id: 3, img: "./empty.png", type: ""},
                      {id: 4, img: "./empty.png", type: ""}];

       this.reset = function(){
         this.points.forEach(function(ability){
           ability.img = './empty.png';
         });
         this.pointCount = 0;
       };

       this.select = function(index){
         if(index == -1){
           this.reset();
           return;
         }
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
        if(this.points[index].img == "./empty.png"){
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(CharCreatorService.freebieMode && point.img != "./full.png"){
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
     }
   };
   this.alertness = new Ability("Alertness");
   this.athletics = new Ability("Athletics");
   this.awareness = new Ability("Awareness");
   this.brawl = new Ability("Brawl");
   this.empathy = new Ability("Empathy");
   this.expression = new Ability("Expression");
   this.intimidation = new Ability("Intimidation");
   this.leadership = new Ability("Leadership");
   this.streetwise = new Ability("Streetwise");
   this.subterfuge = new Ability("Subterfuge");
   this.animalken = new Ability("Animal Ken");
   this.crafts = new Ability("Crafts");
   this.drive = new Ability("Drive");
   this.etiquette = new Ability("Etiquette");
   this.firearms = new Ability("Firearms");
   this.larceny = new Ability("Larceny");
   this.melee = new Ability("Melee");
   this.performance = new Ability("Performance");
   this.stealth = new Ability("Stealth");
   this.survival = new Ability("Survival");
   this.academics = new Ability("Academics");
   this.computer = new Ability("Computer");
   this.finance = new Ability("Finance");
   this.investigation = new Ability("Investigation");
   this.law = new Ability("Law");
   this.medicine = new Ability("Medicine");
   this.occult = new Ability("Occult");
   this.politics = new Ability("Politics");
   this.science = new Ability("Science");
   this.technology = new Ability("Technology");

   this.abilityCategories = [
     {
       id: 0, category: "talents", priority: null,
       abilities:
       [
         this.alertness, this.athletics, this.awareness, this.brawl,
         this.empathy, this.expression, this.intimidation, this.leadership,
         this.streetwise, this.subterfuge
       ]
    },
    {
      id: 1, category: "skills", priority: null,
      abilities:
      [
        this.animalken, this.crafts, this.drive, this.etiquette, this.firearms,
        this.larceny, this.melee, this.performance, this.stealth, this.survival
      ]
    },
    {
      id: 2, category: "knowledges", priority: null,
      abilities:
      [
        this.academics, this.computer, this.finance, this.investigation,
        this.law, this.medicine, this.occult, this.politics, this.science,
        this.technology
      ]
    }];

    function getPriority(ability){
     for(var i = 0; i < this.abilityCategories.length; i++){
       if(this.abilityCategories[i].abilities.indexOf(ability)!=-1){
         return this.selectedPriorities[i];
       }
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
    };

    function selectAbility(ability, index){

      var priortyPts = 0;
      var pointDiff = 0;

      var priority = this.getPriority(ability);

      //Different operations if using Freebie points.
      if(CharCreatorService.freebieMode){
        priorityPts = CharCreatorService.getFreebiePts();

        if(index < ability.pointCount - 1)
          pointDiff = (ability.pointCount * 2) - (index + 1 * 2);
        if((index == ability.pointCount-1)){
          pointDiff = (ability.pointCount * 2) - (index * 2);
          index -= 1;
        }
        else if(index > ability.pointCount-1)
          pointDiff = ((ability.pointCount-1) * 2) + (-2 * index);

        if(priorityPts + pointDiff < 0)
          return null;

        CharCreatorService.changeFreebiePts(pointDiff);
        ability.pointCount = (index+1);
        ability.select(index);
        return;
      }
      else{
         priorityPts = this.getPriorityPts(priority);
         var pointDiff = ability.pointCount - (index+1);
      }

      if(priority==null || (!CharCreatorService.freebieMode && index >= 3)){
       return null;
      }

      //Do math to make sure they can't spend points they don't have,
      //even when priorityPts isn't equal to 0.
      //Case example: increase 3 pts when priorityPts = 2.
      if((priorityPts+pointDiff < 0)){
       return null;
      }

      if(index == 0 && ability.pointCount == 1){
        ability.pointCount = 0;
        pointDiff = 1;
        index = -1;
      }
      else{
        //Change the point count in the ability.
        ability.pointCount = (index+1);
      }


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
      this.abilityPtsTotal += pointDiff;
      //Fill in the dots!
      ability.select(index);
    };

    function priorityChange(changedPriority, id, prevPriority){
      this.abilityCategories[id].priority = changedPriority;
      for(var i = 0; i < this.selectedPriorities.length; i++){
        if(changedPriority == this.selectedPriorities[i] && id != i){
          this.selectedPriorities[i] = null;
          this.abilityCategories[i].abilities.forEach(function(abil){
            abil.reset();
          });
        }
      }
        //Reset the dots.
        this.abilityCategories[id].abilities.forEach(function(abil){
          abil.reset();

        });
        //Reset the point values.
        if(prevPriority == "Primary"){
          this.primaryPts = 13;
        }
        if(prevPriority == "Secondary"){
          this.secondaryPts  = 9;
        }
        if(prevPriority == "Tertiary"){
          this.tertiaryPts = 5;
        }
        if(changedPriority == "Primary"){
          this.primaryPts = 13;
        }
        if(changedPriority == "Secondary"){
          this.secondaryPts = 9;
        }
        if(changedPriority == "Tertiary"){
          this.tertiaryPts = 5;
        }
    };

    function resetAbilities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.abilities.forEach(function(ab){
          ab.reset();
        });
      });
    };

    function resetPriorities(){
      this.abilityCategories.forEach(function(abCat){
        abCat.priority = null;
      });
      this.primaryPts = 13;
      this.secondaryPts = 9;
      this.tertiaryPts = 5;
    };

}]);
