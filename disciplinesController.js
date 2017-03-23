var app = angular.module("site");

app.controller("DisciplinesController", function($scope){
  this.disciplinesPage = "./disciplines.html";
  this.disciplineList = ["Animalism", "Auspex", "Bardo", "Celerity",
                         "Chimerstry", "Daimonion", "Dominate", "Flight",
                         "Fortitude", "Melpominee", "Mytherceria", "Necromancy",
                         "Obeah", "Obfuscate", "Obtenebration", "Potence",
                         "Presence", "Protean", "Quietus", "Sanguinus",
                         "Serpentis", "Spiritus", "Temporis", "Thanatosis",
                         "Thaumaturgy", "Valeren", "Vicissitude", "Visceratika"];

});
