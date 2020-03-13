var app = angular.module("site");

app.service("DisciplineService", ['ClanService', 'CharCreatorService', 'UglyService',
 function(ClanService, CharCreatorService, UglyService){

  this.loadedCharacter = false;
  this.freeDisciplinePt = freeDisciplinePt;
  this.setClan = setClan;
  this.setClanDisciplines = setClanDisciplines;
  this.selectDisciplinePt = selectDisciplinePt;
  this.changeDiscipline = changeDiscipline;
  this.isGargoyle = isGargoyle;
  this.selectedClan = ClanService.selectedClan;
  this.disciplinePts = 3;

  this.getFreebieMode = getFreebieMode;

  this.disciplineList = ["Animalism", "Auspex", "Bardo", "Celerity",
                         "Chimerstry", "Daimonion", "Dementation",
                         "Dominate", "Flight", "Fortitude", "Koldunic Sorcery",
                         "Melpominee", "Mytherceria", "Necromancy", "Obeah",
                         "Obfuscate", "Obtenebration", "Ogham", "Potence",
                         "Presence", "Protean", "Quietus", "Sanguinus",
                         "Serpentis", "Spiritus", "Temporis", "Thanatosis",
                         "Thaumaturgy", "Valeren", "Vicissitude", "Visceratika"];

  function changeDiscipline(discipline, index, prevDisc){
     this.selectedClanDisciplines[index] = new Discipline(discipline);
     for(var i = 0; i < Object.values(this.selectedClanDisciplines).length; i++){
       if(this.selectedClanDisciplines[i].name == this.selectedClanDisciplines[index].name && i != index){
         this.selectedClanDisciplines[index].name = "";
       }
     }
     for(var i = 0; i < prevDisc.points.length; i++){
       if(prevDisc.points[i].type == "original"){
         this.disciplinePts++;
       }
       if(prevDisc.points[i].type == "freebie")
         CharCreatorService.changeFreebiePts(7);
     }
  };

  function getFreebieMode(){
    return CharCreatorService.freebieMode;
  };

  function isGargoyle(){
    if(UglyService.isGargoyle() && this.selectedClanDisciplines[0].pointCount == 0){
      this.selectedClanDisciplines[0].select(0, "original");
      this.selectedClanDisciplines[0].pointCount = 1;
    }
      return false;
  }

  function freeDisciplinePt(discipline, index){
    if(index == 0 && discipline.pointCount == 1){
      discipline.pointCount = 0;
      discipline.zero();
    }
    else{
      discipline.pointCount = (index+1);
      discipline.select(index, "original");
    }
  }

  function selectDisciplinePt(discipline, index){

    var pointDiff = 0;

    if(discipline.name == "Flight" && UglyService.isGargoyle()
       && index == 0 && discipline.pointCount == 1){
      return null;
    }

    //Different operations if using Freebie points.
    if(CharCreatorService.freebieMode){

      if(discipline.points[index].type == "original")
        return null;

      var disciplineFree = CharCreatorService.getFreebiePts();

      if(index < discipline.pointCount - 1)
        pointDiff = (discipline.pointCount * 7) - ((index + 1) * 7);
      if(index == discipline.pointCount-1){
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
    this.disciplinePts = 3;
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
      this.zero = function(){
       this.points.forEach(function(point){
         point.img = "./empty.png";
         point.type = "";
       });
      };
      this.reset = function(){
        this.points.forEach(function(disciplinePt){
          if(disciplinePt.type == "freebie"){
            CharCreatorService.changeFreebiePts(7);
          }
          else if (disciplinePt.type == "original"){
            self.disciplinePts += 1;
          }
          disciplinePt.img = './empty.png';
          disciplinePt.type = "";
        });
        this.pointCount = 0;
      };

      this.select = function(index, type){
        if(index == -1){
          this.pointCount = 0;
          this.points[index+1].img = "./empty.png";
          this.points[index+1].type = "";
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
              if(type == "freebie" && point.img != "./full.png"){
                point.img = "./free.png";
                point.type = type;
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

  var service = this;
  this.selectedClanDisciplines = setClanDisciplines();

  function setClanDisciplines(clan){
    if(service.selectedClanDisciplines){
      var ptsToReset = 0;
      for(var discipline in service.selectedClanDisciplines){
        delete service.selectedClanDisciplines[discipline];
      }
      if(CharCreatorService.freebieMode)
        CharCreatorService.changeFreebiePts(ptsToReset);
      else
        service.disciplinePts+=ptsToReset;
    }
    var clanDisciplines = {};
    if(clan == "Children of Osiris"){
      clanDisciplines = {0: new Discipline("Bardo"), 1: new Discipline(""), 2: new Discipline("")};
    }
    else if(clan == "Caitiff"){
      clanDisciplines = {0: new Discipline(""), 1: new Discipline(""), 2: new Discipline("")};
    }
    else{
      for(var i = 0; i < service.selectedClan.disciplines.length; i++){
        clanDisciplines[i] = new Discipline(service.selectedClan.disciplines[i]);
      }
    }
    return clanDisciplines;
  };

  this.addDiscipline = addDiscipline;
  function addDiscipline(name = "", pointCount = 0, points = []){
    var index = Object.keys(this.selectedClanDisciplines).length;
    if(name == "")
      this.selectedClanDisciplines[index] = new Discipline("");
    else{
      this.selectedClanDisciplines[index] = new Discipline(name);
      this.selectedClanDisciplines[index].pointCount = pointCount;
      this.selectedClanDisciplines[index].points = points;
    }
  };

  this.removeDiscipline = removeDiscipline;
  function removeDiscipline(index){
    this.selectedClanDisciplines[index].reset();
    delete this.selectedClanDisciplines[index];
  };

  this.resetDisciplines = resetDisciplines;
  function resetDisciplines(){
    this.selectedClanDisciplines = this.setClanDisciplines();
    this.disciplinePts = 3;
  }

}]);
