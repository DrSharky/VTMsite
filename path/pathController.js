var app = angular.module("site");

app.controller("PathController",
 ['PathService', '$scope',
 function(PathService, $scope){

   this.freeMode = location.hash.includes("free");
   this.freePathPt = freePathPt;

   var self = this;

   $scope.$on('$routeChangeSuccess', initScope);

   function initScope(){
     if(!PathService.loadedCharacter){
        PathService.resetPath();
     }
   }

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

   $scope.$on('loadCharacter', function(){
     PathService.loadedCharacter = true;
     self.selectedPath = PathService.selectedPath;
     $scope.$apply();
   });

   $scope.$on('resetCharacter', function(){
     PathService.loadedCharacter = false;
     PathService.resetPath();
   });

}]);
