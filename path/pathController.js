var app = angular.module("site");

app.controller("PathController",
 ['PathService', '$scope',
 function(PathService, $scope){

   this.freeMode = location.hash.includes("free");
   this.freePathPt = freePathPt;

   this.pathPage = "./path/path.html";

   this.freebieMode = freebieMode();
   function freebieMode(){
     return PathService.freebieMode;
   }

   this.pathList = pathList();
   function pathList(){
     return PathService.pathList;
   }

   function freePathPt(path, index){
     PathService.freePathPt(path, index);
   }

   this.selectPathPt = selectPathPt;
   function selectPathPt(path, index){
     PathService.selectPathPt(path, index);
   }

   this.selectedPath = selectedPath();
   function selectedPath(){
     return PathService.selectedPath;
   }

   var self = this;
   $scope.$on('loadCharacter', function(){
     self.selectedPath = PathService.selectedPath;
     $scope.$apply();
   });

   $scope.$on('resetCharacter', function(){
     PathService.resetPath();
   });

}]);
