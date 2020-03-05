var app = angular.module("site");

app.controller("CharCreatorController",
 ['CharCreatorService', 'LoginService', '$scope', 'SaveService', '$window',
 function(CharCreatorService, LoginService, $scope, SaveService, $window){

   this.freeMode = location.hash.includes("free");

   this.setPlayer = setPlayer;
   function setPlayer(charPlayer){
     CharCreatorService.charPlayer = charPlayer;
   }

   this.setChronicle = setChronicle;
   function setChronicle(charChronicle){
     CharCreatorService.charChronicle = charChronicle;
   }

   this.setName = setName;
   function setName(charName){
     CharCreatorService.charName = charName;
   }

   this.setConcept = setConcept;
   function setConcept(charConcept){
     CharCreatorService.charConcept = charConcept;
   }

   this.setNature = setNature;
   function setNature(charNature){
     CharCreatorService.charNature = charNature;
   }

   this.customDemeanor = false;
   this.setDemeanor = setDemeanor;
   function setDemeanor(charDemeanor){
     CharCreatorService.charDemeanor = charDemeanor;
   }

   this.setSire = setSire;
   function setSire(charSire){
     CharCreatorService.charSire = charSire;
   }

   this.setGeneration = setGeneration;
   function setGeneration(charGeneration){
     CharCreatorService.charGeneration = charGeneration;
   }

   this.loggedIn = LoginService.loggedIn();

   // this.freeMode = getFreeMode();
   // function getFreeMode(){
   //   return CharCreatorService.freeMode;
   // }

   this.charPlayer = getCharPlayer();
   function getCharPlayer(){
     return CharCreatorService.charPlayer;
   };

   this.charChronicle = getCharChronicle();
   function getCharChronicle(){
     return CharCreatorService.charChronicle;
   }

   this.charName = getCharName();
   function getCharName(){
     return CharCreatorService.charName;
   }

   this.charConcept = getCharConcept();
   function getCharConcept(){
     return CharCreatorService.charConcept;
   }

   this.charNature = getCharNature();
   function getCharNature(){
     return CharCreatorService.charNature;
   }

   this.charDemeanor = getCharDemeanor();
   function getCharDemeanor(){
     return CharCreatorService.charDemeanor;
   }

   this.charSire = getCharSire();
   function getCharSire(){
     return CharCreatorService.charSire;
   }

   this.charGeneration = getCharGeneration();
   function getCharGeneration(){
     return CharCreatorService.charGeneration;
   }

   this.generations = getGenerations();
   function getGenerations(){
     return CharCreatorService.generations;
   }

   this.toggleFreebieMode = toggleFreebieMode;
   this.getFreebiePts = getFreebiePts;

   function toggleFreebieMode(){
     CharCreatorService.toggleFreebieMode();
   }

   this.freebiePts = getFreebiePts();
   function getFreebiePts(){
     return CharCreatorService.freebiePts;
   }

   this.maxFreePts = 22;
   this.maxFlawBonus = 7;

   this.natureDemeanorList = ["Architect", "Autocrat", "Bon Vivant",
                              "Bravo", "Capitalist", "Caregiver",
                              "Celebrant", "Chameleon", "Child",
                              "Competitor", "Conformist", "Conniver",
                              "Creep Show", "Curmudgeon", "Dabbler",
                              "Deviant", "Director", "Enigma",
                              "Eye of the Storm", "Fanatic", "Gallant",
                              "Guru", "Idealist", "Judge",
                              "Loner", "Martyr", "Masochist",
                              "Monster", "Pedagogue", "Penitent",
                              "Perfectionist", "Rebel", "Rogue",
                              "Sadist", "Scientist", "Sociopath",
                              "Soldier", "Survivor", "Thrill-Seeker",
                              "Traditionalist", "Trickster", "Visionary"];

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.charPlayer = CharCreatorService.charPlayer;
     self.charChronicle = CharCreatorService.charChronicle;
     self.charName = CharCreatorService.charName;
     self.charConcept = CharCreatorService.charConcept;
     self.charNature = CharCreatorService.charNature;
     self.charDemeanor = CharCreatorService.charDemeanor;
     self.charSire = CharCreatorService.charSire;
     self.charGeneration = CharCreatorService.charGeneration;
     $scope.$apply();
   })

   $scope.$on('resetCharacter', function(){
     self.charPlayer = null;
     self.charChronicle = null;
     self.charName = null;
     self.charConcept = null;
     self.charNature = null;
     self.charDemeanor = null;
     self.charSire = null;
     self.charGeneration = "13th";
   });

}]);
