var app = angular.module("site");

app.service("DisciplineService", ['ClanService', 'CharCreatorService',
 function(ClanService, CharCreatorService){

  this.setClan = setClan;
  this.setClanDisciplines = setClanDisciplines;
  this.selectDisciplinePt = selectDisciplinePt;
  this.selectedClan = ClanService.selectedClan;
  this.disciplinePts = 3;

  this.getFreebieMode = getFreebieMode;

  function getFreebieMode(){
    return CharCreatorService.freebieMode;
  }

  //TODO: Going to have to edit this function to apply the point type rules.
        //Moving logic outside the point.select function & in here possibly.

  function selectDisciplinePt(discipline, index){

    var pointDiff = 0;

    //Different operations if using Freebie points.
    if(CharCreatorService.freebieMode){

      if(discipline.points[index].type == "original")
        return null;

      var disciplineFree = CharCreatorService.getFreebiePts();

      if(index < discipline.pointCount - 1)
        pointDiff = (discipline.pointCount * 7) - (index + 1 * 7);
      if((index == discipline.pointCount-1)){
        pointDiff = (discipline.pointCount * 7) - (index * 7);
        index -= 1;
      }
      else if(index > discipline.pointCount-1)
        pointDiff = ((discipline.pointCount-1) * 7) + (-7 * index);

      if(disciplineFree + pointDiff < 0)
        return null;

      CharCreatorService.changeFreebiePts(pointDiff);
      discipline.pointCount = (index+1);
      discipline.select(index, "freebie");
      return;
    }
    else
       pointDiff = discipline.pointCount - (index+1);

    //Do math to make sure they can't spend points they don't have, even when
    //priorityPts isn't equal to 0.
    //Case example: increase 3 pts when pts = 2.
    if((this.disciplinePts + pointDiff < 0))
      return null;

    if(index == 0 && discipline.pointCount == 1){
      discipline.pointCount = 0;
      pointDiff = 1;
      index = -1;
      discipline.points[0].type = "";
    }
    else{
      //Change the point count in the discipline.
      discipline.pointCount = (index+1);
    }

    this.disciplinePts += pointDiff;
    //Fill in the dots!
    discipline.select(index, "original");
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

  var self = this;
  class Discipline {
    constructor(name){
      this.name = name;
      this.pointCount = 0;
      this.points = [{id: 0, img: "./empty.png", type:""},
                     {id: 1, img: "./empty.png", type:""},
                     {id: 2, img: "./empty.png", type:""},
                     {id: 3, img: "./empty.png", type:""},
                     {id: 4, img: "./empty.png", type:""}];

      this.reset = function(){
        this.points.forEach(function(discipline){
          discipline.img = './empty.png';
        });

        this.pointCount = 0;
      };

      this.select = function(index, type){
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
        if(this.points[index].img=="./empty.png")
        {
          this.points.forEach(function(point){
            if(point.id > index){
              return;
            }
            else{
              if(!(point.img == "./full.png")){
                point.type = type;
              }
              if(CharCreatorService.freebieMode)
                point.img = "./free.png";
              else
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
    if(service.selectedClanDisciplines){
      var ptsToReset = 0;
      service.selectedClanDisciplines.forEach(function(discipline){
        ptsToReset+= discipline.pointCount;
        discipline.reset();
      });
      if(CharCreatorService.freebieMode)
        CharCreatorService.freebiePts+=ptsToReset;
      else
        service.disciplinePts+=ptsToReset;
    }
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
