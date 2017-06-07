var app = angular.module("site");

app.controller("CharCreatorController",
 [ 'CharCreatorService', 'LoginService', 'PdfService',
 function(CharCreatorService, LoginService, PdfService){


   this.loggedIn = LoginService.loggedIn();

   if(this.loggedIn){
     var uid = LoginService.getUID();
     var ref = firebase.database().ref('users/'+uid);
     if(ref==null){
       firebase.database().ref('users/'+uid).set({uid: uid});
     }
   }

   this.charPlayer = null;
   this.charChronicle = null;
   this.charName = null;
   this.charConcept = null;
   this.charNature = null;
   this.charDemeanor = null;
   this.charGeneration = "13th";
   this.charSire = null;
   this.saveCharacter = saveCharacter;

   function saveCharacter(){
     var uid = LoginService.getUID();
     firebase.database().ref('users/'+uid).set({charData:
                                {
                                  player: this.charPlayer,
                                  chronicle: this.charChronicle,
                                  name: this.charName,
                                  concept: this.charConcept,
                                  nature: this.charNature,
                                  demeanor: this.charDemeanor,
                                  generation: this.charGeneration,
                                  sire: this.charSire
                                },
                              });
   }

  //TODO: Not sure if I should delete these, might be useful in
  // the process of saving the character.
  //  this.primaryAttr = 7;
  //  this.secondaryAttr = 5;
  //  this.tertiaryAttr = 3;
   //
  //  this.primaryAb = 13;
  //  this.secondaryAb = 9;
  //  this.tertiaryAb = 5;
   //
  //  this.disciplinePts = 3;
  //  this.backgroundPts = 5;
  //  this.virtuePts = 7;

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

   this.generations = ["3rd", "4th", "5th", "6th", "7th",
                       "8th", "9th", "10th", "11th", "12th",
                       "13th", "14th", "15th"];
}]);
