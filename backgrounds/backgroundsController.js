var app = angular.module("site");

app.controller("BackgroundsController",
['BackgroundsService', 'CharCreatorService', '$scope',
 function(BackgroundsService, CharCreatorService, $scope){

   $scope.$on('$routeChangeSuccess', initScope);

   var self = this;
   function initScope(){
     if(!BackgroundsService.loadedCharacter){
       BackgroundsService.resetBackgrounds();
       self.selectedList = BackgroundsService.selectedList;
     }
   }

   this.freeMode = location.hash.includes("free");
   this.freeBackgroundPt = freeBackgroundPt;

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

   function freeBackgroundPt(background, index){
     BackgroundsService.freeBackgroundPt(background, index);
   }

   function selectBackgroundPt(background, index){
     BackgroundsService.selectBackgroundPt(background, index);
   }

   function chooseBackground(background, index){
     BackgroundsService.chooseBackground(background, index);
   }

   $scope.$on('loadCharacter', function(){
     BackgroundsService.loadedCharacter = true;
     self.selectedList = BackgroundsService.selectedList;
     $scope.$apply();
   })

 }]);
