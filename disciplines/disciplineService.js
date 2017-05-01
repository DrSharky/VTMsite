var app = angular.module("site");

app.service("DisciplineService", ['ClanService', function(ClanService){

  this.setClan = setClan;
  this.setClanDisciplines = setClanDisciplines;
  this.selectDisciplinePt = selectDisciplinePt;
  this.selectedClan = ClanService.selectedClan;
  this.disciplinePts = 3;

  function selectDisciplinePt(discipline, index){
    var pointDiff = discipline.pointCount - (index+1);

    //Do math to make sure they can't spend points they don't have, even when
    //priorityPts isn't equal to 0.
    //Case example: increase 3 pts when pts = 2.
    if((this.disciplinePts + pointDiff < 0))
      return null;

    //Don't let the user spend points they don't have!
    if(this.disciplinePts <= 0 && pointDiff < 0)
      return null;

    if(index == 0 && discipline.pointCount == 1){
      discipline.pointCount = 0;
      pointDiff = 1;
      index = -1;
    }
    else{
      //Change the point count in the attribute.
      discipline.pointCount = (index+1);
    }

    this.disciplinePts += pointDiff;
    //Fill in the dots!
    discipline.select(index);
  };

  function setClan(clan){
    this.selectedClan = clan;
    var newDisciplines = setClanDisciplines(clan.name);
    if(newDisciplines.length < this.selectedClanDisciplines.length){
      var diff = newDisciplines.length - this.selectedClanDisciplines.length;
      this.selectedClanDisciplines.splice(0, newDisciplines.length);
    }
    angular.extend(this.selectedClanDisciplines, newDisciplines);
  };

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

  var service = this;
  this.selectedClanDisciplines = setClanDisciplines();
  function setClanDisciplines(clan){
    var clanDisciplines = [];
    if(clan == "Children of Osiris"){
      clanDisciplines = [new Discipline("Bardo"), new Discipline(""), new Discipline("")];
    }
    else if(clan == "Caitiff"){
      clanDisciplines = [new Discipline(""), new Discipline(""), new Discipline("")];
    }
    else{
      for(var i = 0; i < service.selectedClan.disciplines.length; i++){
        clanDisciplines.push(new Discipline(service.selectedClan.disciplines[i]));
      }
    }
    return clanDisciplines;
  };

}]);
