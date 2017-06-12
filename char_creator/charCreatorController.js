var app = angular.module("site");

app.controller("CharCreatorController",
 [ 'CharCreatorService', 'LoginService', 'PdfService',
 function(CharCreatorService, LoginService, PdfService){

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

   //TODO: etc...
   this.charPlayer = CharCreatorService.charPlayer;

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

   this.charGeneration = getCharGeneration();
   function getCharGeneration(){
     return CharCreatorService.charGeneration;
   }

   this.charSire = getCharSire();
   function getCharSire(){
     return CharCreatorService.charSire;
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
}]);
