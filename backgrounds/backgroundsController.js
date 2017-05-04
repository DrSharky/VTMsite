var app = angular.module("site");

app.controller("BackgroundsController", ['BackgroundsService',
 function(BackgroundsService){

  this.selectBackgroundPt = selectBackgroundPt;
  this.backgroundsPage = "./backgrounds/backgrounds.html";

  this.selectedList = function(){
    return BackgroundsService.selectedList;
  }

  function selectBackgroundPt(background, index){
    BackgroundsService.selectBackgroundPt(background, index);
  };
}]);
