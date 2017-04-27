var app = angular.module("site");

app.controller("DisciplinesController",
['$scope', 'ClanService', function($scope, ClanService){
  this.disciplinesPage = "./disciplines/disciplines.html";

  this.disciplines = [];

  this.disciplineList = ["Animalism", "Auspex", "Bardo", "Celerity",
                         "Chimerstry", "Daimonion", "Dominate", "Flight",
                         "Fortitude", "Melpominee", "Mytherceria", "Necromancy",
                         "Obeah", "Obfuscate", "Obtenebration", "Potence",
                         "Presence", "Protean", "Quietus", "Sanguinus",
                         "Serpentis", "Spiritus", "Temporis", "Thanatosis",
                         "Thaumaturgy", "Valeren", "Vicissitude", "Visceratika"];

  class Discipline {
    constructor(name){
      this.name = name;
      this.pointCount = 0;
      this.points = [{id: 0, img: "./empty.png"},
                     {id: 1, img: "./empty.png"},
                     {id: 2, img: "./empty.png"},
                     {id: 3, img: "./empty.png"},
                     {id: 4, img: "./empty.png"}];

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

  this.selectedClanDisciplines = getDisciplines();
  function getDisciplines(){
    return ClanService.selectedClanDisciplines;
  }
  // function getDisciplines(){
  //   var clanDisciplineNames = ClanService.selectedClan.disciplines;
  //   var clanDisciplines = [];
  //   for(var i = 0; i < clanDisciplineNames.length; i++){
  //     clanDisciplines.push(new Discipline(clanDisciplineNames[i]));
  //   }
  //   return clanDisciplines;
  // };

  function setClanDisciplines(){
    for(var i = 0; i < this.selectedClanDisciplines.length; i++){
      this.disciplines.push(new Discipline(this.selectedClanDisciplines[i]));
    }
  };


}]);
