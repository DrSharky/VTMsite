var app = angular.module("site");

app.controller("BackgroundsController",
['BackgroundsService', 'CharCreatorService', '$scope',
 function(BackgroundsService, CharCreatorService, $scope){

   this.selectBackgroundPt = selectBackgroundPt;
   this.chooseBackground = chooseBackground;
   this.backgroundsPage = "./backgrounds/backgrounds.html";

   this.getFreebieMode = getFreebieMode;
   function getFreebieMode(){
     return CharCreatorService.freebieMode;
   }

   this.removeBackground = removeBackground;
   function removeBackground(index){
     BackgroundsService.removeBackground(index);
   }

   this.addBackground = addBackground;
   function addBackground(){
     BackgroundsService.addBackground();
   }

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

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.selectedList = BackgroundsService.selectedList;
     $scope.$apply();
   })

 }]);
