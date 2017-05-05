var app = angular.module("site");

app.controller("VirtuesController",
 ['VirtuesService', function(VirtuesService){

   this.selectVirtuePt = selectVirtuePt;
   this.virtuesPage = "./virtues/virtues.html";

   this.virtuePts = getVirtuePts();
   function getVirtuePts(){
     return VirtuesService.virtuePts;
   }

   this.virtueList = virtueList();
   function virtueList(){
     return VirtuesService.virtueList;
   }

   function selectVirtuePt(virtue, index){
     VirtuesService.selectVirtuePt(virtue, index);
   }

}]);
