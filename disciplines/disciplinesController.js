var app = angular.module("site");

app.controller("DisciplinesController",
 ['$scope', 'ClanService', 'DisciplineService',
 function($scope, ClanService, DisciplineService){

   this.getFreebieMode = getFreebieMode;
   function getFreebieMode(){
     return DisciplineService.getFreebieMode();
   };

  this.isGargoyle = isGargoyle;
  this.selectDisciplinePt = selectDisciplinePt;
  this.disciplinesPage = "./disciplines/disciplines.html";
  this.disciplineList = ["Animalism", "Assamite Sorcery", "Auspex", "Bardo", "Celerity",
                         "Chimerstry", "Daimonion", "Dementation",
                         "Dominate", "Flight", "Fortitude", "Koldunic Sorcery", "Melpominee",
                         "Mytherceria", "Necromancy", "Obeah", "Obfuscate",
                         "Obtenebration", "Ogham", "Potence", "Presence",
                         "Protean", "Quietus", "Sanguinus", "Serpentis",
                         "Spiritus", "Temporis", "Thanatosis", "Thaumaturgy",
                         "Valeren", "Vicissitude", "Visceratika"];

  function selectDisciplinePt(discipline, index){
    DisciplineService.selectDisciplinePt(discipline, index);
  };

  function isGargoyle(){
    return DisciplineService.isGargoyle();
  };

  this.changeDiscipline = changeDiscipline;
  function changeDiscipline(discipline, index, prevDisc){
    DisciplineService.changeDiscipline(discipline, index, prevDisc);
  };

  this.selectedClanDisciplines = getDisciplines();
  function getDisciplines(){
    return DisciplineService.selectedClanDisciplines;
  };

  this.getDisciplinePts = getDisciplinePts;
  function getDisciplinePts(){
    return DisciplineService.disciplinePts;
  };

  this.addDiscipline = addDiscipline;
  function addDiscipline(){
    DisciplineService.addDiscipline();
  };

  this.removeDiscipline = removeDiscipline;
  function removeDiscipline(index){
    DisciplineService.removeDiscipline(index);
  };

}]);
