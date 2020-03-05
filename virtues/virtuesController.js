var app = angular.module("site");

app.controller("VirtuesController",
 ['VirtuesService', '$scope', function(VirtuesService, $scope){

   this.freeMode = location.hash.includes("free");
   this.freeVirtuePt = freeVirtuePt;

   this.selectVirtuePt = selectVirtuePt;
   this.virtuesPage = "./virtues/virtues.html";

   this.getVirtuePts = getVirtuePts;
   function getVirtuePts(){
     return VirtuesService.virtuePts;
   };

   this.virtueList = virtueList();
   function virtueList(){
     return VirtuesService.virtueList;
   };

   function freeVirtuePt(virtue, index){
     VirtuesService.freeVirtuePt(virtue, index);
   };

   function selectVirtuePt(virtue, index){
     VirtuesService.selectVirtuePt(virtue, index);
   };

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.virtueList = VirtuesService.virtueList;
     $scope.$apply();
   });

   $scope.$on('resetCharacter', function(){
     VirtuesService.resetVirtues();
   });

}]);
