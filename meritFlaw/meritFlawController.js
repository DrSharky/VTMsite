var app = angular.module("site");

app.controller("MeritFlawController",
['MeritFlawService', 'CharCreatorService', '$scope',
 function(MeritFlawService, CharCreatorService, $scope){

   this.freeMode = location.hash.includes("free");
   var self = this;

   $scope.$on('$routeChangeSuccess', initScope);

   function initScope(){
     if(!MeritFlawService.loadedCharacter){
       MeritFlawService.resetMeritFlaws();
     }
   }

   this.chooseMeritFlaw = chooseMeritFlaw;
   this.meritFlawPage = "./meritFlaw/meritflaw.html";

   this.getFreebieMode = getFreebieMode;
   function getFreebieMode(){
     return CharCreatorService.freebieMode;
   }

   this.removeMeritFlaw = removeMeritFlaw;
   function removeMeritFlaw(index, category){
     MeritFlawService.removeMeritFlaw(index, category);
   }

   this.addMeritFlaw = addMeritFlaw;
   function addMeritFlaw(category){
     MeritFlawService.addMeritFlaw(category);
   }

   //Physical Stuff-----------------------------------
   this.selectedPhysicalMerits = selectedPhysicalMerits();
   function selectedPhysicalMerits(){
     return MeritFlawService.selectedPhysicalMerits;
   }

   this.selectedPhysicalFlaws = selectedPhysicalFlaws();
   function selectedPhysicalFlaws(){
     return MeritFlawService.selectedPhysicalFlaws;
   }

   this.physicalMeritList = physicalMeritList();
   function physicalMeritList(){
     return Object.keys(MeritFlawService.physicalMeritList);
   }

   this.physicalFlawList = physicalFlawList();
   function physicalFlawList(){
     return Object.keys(MeritFlawService.physicalFlawList);
   }
   //------------------------------------------------

   //Mental Stuff------------------------------------
   this.selectedMentalMerits = selectedMentalMerits();
   function selectedMentalMerits(){
     return MeritFlawService.selectedMentalMerits;
   }

   this.selectedMentalFlaws = selectedMentalFlaws();
   function selectedMentalFlaws(){
     return MeritFlawService.selectedMentalFlaws;
   }

   this.mentalMeritList = mentalMeritList();
   function mentalMeritList(){
     return Object.keys(MeritFlawService.mentalMeritList);
   }

   this.mentalFlawList = mentalFlawList();
   function mentalFlawList(){
     return Object.keys(MeritFlawService.mentalFlawList);
   }
   //----------------------------------------------

   //Social Stuff----------------------------------
   this.selectedSocialMerits = selectedSocialMerits();
   function selectedSocialMerits(){
     return MeritFlawService.selectedSocialMerits;
   }

   this.selectedSocialFlaws = selectedSocialFlaws();
   function selectedSocialFlaws(){
     return MeritFlawService.selectedSocialFlaws;
   }

   this.socialMeritList = socialMeritList();
   function socialMeritList(){
     return Object.keys(MeritFlawService.socialMeritList);
   }

   this.socialFlawList = socialFlawList();
   function socialFlawList(){
     return Object.keys(MeritFlawService.socialFlawList);
   }
   //---------------------------------------------

   //Supernatural Stuff---------------------------
   this.selectedSupernaturalMerits = selectedSupernaturalMerits();
   function selectedSupernaturalMerits(){
     return MeritFlawService.selectedSupernaturalMerits;
   }

   this.selectedSupernaturalFlaws = selectedSupernaturalFlaws();
   function selectedSupernaturalFlaws(){
     return MeritFlawService.selectedSupernaturalFlaws;
   }

   this.supernaturalMeritList = supernaturalMeritList();
   function supernaturalMeritList(){
     return Object.keys(MeritFlawService.supernaturalMeritList);
   }

   this.supernaturalFlawList = supernaturalFlawList();
   function supernaturalFlawList(){
     return Object.keys(MeritFlawService.supernaturalFlawList);
   }
   //---------------------------------------------

   function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
     MeritFlawService.chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category);
   }

   $scope.$on('loadCharacter', function(){
     MeritFlawService.loadedCharacter = true;
     self.selectedPhysicalMerits = MeritFlawService.selectedPhysicalMerits;
     self.selectedPhysicalFlaws = MeritFlawService.selectedPhysicalFlaws;
     self.selectedMentalMerits = MeritFlawService.selectedMentalMerits;
     self.selectedMentalFlaws = MeritFlawService.selectedMentalFlaws;
     self.selectedSocialMerits = MeritFlawService.selectedSocialMerits;
     self.selectedSocialFlaws = MeritFlawService.selectedSocialFlaws;
     self.selectedSupernaturalMerits = MeritFlawService.selectedSupernaturalMerits;
     self.selectedSupernaturalFlaws = MeritFlawService.selectedSupernaturalFlaws;
     $scope.$apply();
   });

   $scope.$on('resetCharacter', function(){
     self.loadedCharacter = false;
     MeritFlawService.resetMeritFlaws();
   });

 }]);
