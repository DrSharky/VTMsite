var app = angular.module("site");

app.controller("MeritFlawController",
['MeritFlawService', 'CharCreatorService', '$scope',
 function(MeritFlawService, CharCreatorService, $scope){

   this.selectMeritFlawPt = selectMeritFlawPt;
   this.chooseMeritFlaw = chooseMeritFlaw;
   this.meritFlawPage = "./meritFlaw/meritflaw.html";

   this.getFreebieMode = getFreebieMode;
   function getFreebieMode(){
     return CharCreatorService.freebieMode;
   }

   this.removeMeritFlaw = removeMeritFlaw;
   function removeMeritFlaw(index){
     MeritFlawService.removeMeritFlaw(index);
   }

   this.addMeritFlaw = addMeritFlaw;
   function addMeritFlaw(category){
     MeritFlawService.addMeritFlaw(category);
   }

   this.getMeritFlawPts = getMeritFlawPts;
   function getMeritFlawPts(){
     return MeritFlawService.MeritFlawPts;
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
     return MeritFlawService.physicalMeritList;
   }

   this.physicalFlawList = physicalFlawList();
   function physicalFlawList(){
     return MeritFlawService.physicalFlawList;
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
     return MeritFlawService.mentalMeritList;
   }

   this.mentalFlawList = mentalFlawList();
   function mentalFlawList(){
     return MeritFlawService.mentalFlawList;
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
     return MeritFlawService.socialMeritList;
   }

   this.socialFlawList = socialFlawList();
   function socialFlawList(){
     return MeritFlawService.socialFlawList;
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
     return MeritFlawService.supernaturalMeritList;
   }

   this.supernaturalFlawList = supernaturalFlawList();
   function supernaturalFlawList(){
     return MeritFlawService.supernaturalFlawList;
   }
   //---------------------------------------------

   function selectMeritFlawPt(meritFlaw, index){
     MeritFlawService.selectMeritFlawPt(meritFlaw, index);
   }

   function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
     MeritFlawService.chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category);
   }

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.selectedList = MeritFlawService.selectedList;
     $scope.$apply();
   })

 }]);
