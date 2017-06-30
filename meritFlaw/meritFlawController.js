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
   function addMeritFlaw(){
     MeritFlawService.addMeritFlaw();
   }

   this.getMeritFlawPts = getMeritFlawPts;
   function getMeritFlawPts(){
     return MeritFlawService.MeritFlawPts;
   }

   this.selectedList = selectedList();
   function selectedList(){
     return MeritFlawService.selectedList;
   }

   this.physicalMeritList = physicalMeritList();
   function physicalMeritList(){
     return MeritFlawService.physicalMeritList;
   }

   this.physicalFlawList = physicalFlawList();
   function physicalFlawList(){
     return MeritFlawService.physicalFlawList;
   }

   this.socialMeritList = socialMeritList();
   function socialMeritList(){
     return MeritFlawService.socialMeritList;
   }

   this.physicalFlaws = physicalFlaws();
   function physicalFlaws(){
     return MeritFlawService.physicalFlaws;
   }

   function selectMeritFlawPt(meritFlaw, index){
     MeritFlawService.selectMeritFlawPt(meritFlaw, index);
   }

   function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
     MeritFlawService.chooseMeritFlaw(meritFlaw, index, category);
   }

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.selectedList = MeritFlawService.selectedList;
     $scope.$apply();
   })

 }]);
