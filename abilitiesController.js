var app = angular.module("site");

app.controller("AbilitiesController", function(){

  this.getPriority = getPriority;
  this.getPriorityPts = getPriorityPts;
  this.selectAbility = selectAbility;
  this.abilitiesPage = "./abilities.html";
  this.primaryPts = 13;
  this.secondaryPts = 9;
  this.tertiaryPts = 5;
  this.abilityPriorities = ["Primary", "Secondary", "Tertiary"];
  this.selectedPriorities = [null, null, null];

  class Ability {
    constructor(name){
      this.name = name;
      this.pointCount = 0;
      this.points = [{id: 0, img: "./empty.png"},
                     {id: 1, img: "./empty.png"},
                     {id: 2, img: "./empty.png"},
                     {id: 3, img: "./empty.png"},
                     {id: 4, img: "./empty.png"},];

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
    }
  };
  this.alertness = new Ability("alertness");
  this.athletics = new Ability("athletics");
  this.awareness = new Ability("awareness");
  this.brawl = new Ability("brawl");
  this.empathy = new Ability("empathy");
  this.expression = new Ability("expression");
  this.intimidation = new Ability("intimidation");
  this.leadership = new Ability("leadership");
  this.streetwise = new Ability("streetwise");
  this.subterfuge = new Ability("subterfuge");
  this.animalken = new Ability("animalken");
  this.crafts = new Ability("crafts");
  this.drive = new Ability("drive");
  this.etiquette = new Ability("etiquette");
  this.firearms = new Ability("firearms");
  this.larceny = new Ability("larceny");
  this.melee = new Ability("melee");
  this.performance = new Ability("performance");
  this.stealth = new Ability("stealth");
  this.survival = new Ability("survival");
  this.academics = new Ability("academics");
  this.computer = new Ability("computer");
  this.finance = new Ability("finance");
  this.investigation = new Ability("investigation");
  this.law = new Ability("law");
  this.medicine = new Ability("medicine");
  this.occult = new Ability("occult");
  this.politics = new Ability("politics");
  this.science = new Ability("science");
  this.technology = new Ability("technology");

  this.abilityCategories = [
    {
      id: 0, category: "talents", priority: null,
      abilities:
      [
        this.alertness, this.athletics, this.awareness, this.brawl, this.empathy,
        this.expression, this.intimidation, this.leadership, this.streetwise, this.subterfuge
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
       this.academics, this.computer, this.finance, this.investigation, this.law,
       this.medicine, this.occult, this.politics, this.science, this.technology
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

    //Keep in case a bug pops up, but I think this is fixed.
    // var catIndex = this.getCategoryIndex(ability.name);
    // var sumPointCount = -3;
    // this.abilityCategories[catIndex].abilitys.forEach(function(ability){
    //   sumPointCount += ability.pointCount;
    // });

    var priority = this.getPriority(ability);
    if(priority==null){
     return null;
    }
    var priorityPts = this.getPriorityPts(priority);
    var pointDiff = ability.pointCount - (index+1);

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

    //Change the point count in the ability.
    ability.pointCount = (index+1);

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
  }
  this.rowList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
});

app.directive('abilitygrid', function(){
  return {
    scope: {row: "@"},
    restrict: "E",
    controller: "AbilitiesController",
    controllerAs: "abCtrl",
    template: '<abilityrow ng-repeat="row in abCtrl.rowList"></abilityrow>',
    link: function(scope, element, attrs){
      scope.row = attrs.row;
    }
  }
})

app.directive('abilityrow', function(){
  return {
    scope: {row: "@"},
    restrict: "E",
    controller: 'AbilitiesController',
    controllerAs: 'abCtrl',
    template: '<ability row="{{row}}">{{row}}</ability>',
    link: function(scope, element, attrs){
      scope.row = attrs.row;
    },
  }
});

app.directive('ability', function(){
  return {
    scope: {row: "@"},
    restrict: 'E',
    controller: 'AbilitiesController',
    controllerAs: 'abCtrl',
    template: '<div class="abLabel">{{abCtrl.abilityCategories[row].abilities[row].name}}</div>',
    // template: '<td>'+
    //   '<div class="abLabel">'+ability+'</div>'+
    // '</td>'+
    // '<td>'+
    //   '<div ng-repeat="'+ability+'Pt in abCtrl.'+ability+'.points" style="display: inline-block;">'+
    //     '<img ng-src="{{'+ability+'Pt.img}}" ng-click="abCtrl.selectAbility(abCtrl.'+ability+', $index)"'+
    //      'style="width:15px; height: 15px;" />'+
    // '</td>',
    link: function(scope, element, attrs){}
  }
});
