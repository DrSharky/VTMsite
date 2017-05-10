var app = angular.module("site");

app.controller("BackgroundsController", ['BackgroundsService',
 function(BackgroundsService){

   this.selectBackgroundPt = selectBackgroundPt;
   this.chooseBackground = chooseBackground;
   this.backgroundsPage = "./backgrounds/backgrounds.html";

   this.getBackgroundPts = getBackgroundPts;
   function getBackgroundPts(){
     return BackgroundsService.backgroundPts;
   }

   this.selectedList = selectedList();
   function selectedList(){
     return BackgroundsService.selectedList;
   }

   this.backgroundList = backgroundList();
   function backgroundList(){
     return BackgroundsService.backgroundList;
   }

   function selectBackgroundPt(background, index){
     BackgroundsService.selectBackgroundPt(background, index);
   }

   function chooseBackground(background, index){
     BackgroundsService.chooseBackground(background, index);
   }

 }]);
