var app = angular.module("site");

app.service("PathService",
 ['CharCreatorService', "VirtuesService",
 function(CharCreatorService, VirtuesService){

   this.freebieMode = freebieMode();
   function freebieMode(){
     return CharCreatorService.freebieMode;
   }

  //  this.getPointList = getPointList;
   this.selectPath = selectPath;
   this.getPathRating = getPathRating;
   this.pathList = ["Humanity", "Path of Blood", "Path of the Bones",
                    "Path of Caine", "Path of Cathari", "Path of the Feral Heart",
                    "Path of Honorable Accord", "Path of Lilith",
                    "Path of Metamorphosis", "Path of Night",
                    "Path of Paradox (Mayaparisatya)", "Path of Paradox (Samsara)",
                    "Path of Paradox (Western)", "Path of Power and the Inner Voice",
                    "Path of Typhon", "Path of Entelechy",
                    "Path of Evil Revelations", "Path of the Warrior",
                    "Path of Ecstasy", "Path of the Scorched Heart",
                    "Path of the Hive"];

  var self = this;
  class Path{
    constructor(name){
      this.name = name;
      this.pointCount = self.getPathRating();

       this.points = [{id:0, img:"./full.png"},
                      {id:1, img:"./empty.png"},
                      {id:2, img:"./empty.png"},
                      {id:3, img:"./empty.png"},
                      {id:4, img:"./empty.png"},
                      {id:5, img:"./empty.png"},
                      {id:6, img:"./empty.png"},
                      {id:7, img:"./empty.png"},
                      {id:8, img:"./empty.png"},
                      {id:9, img:"./empty.png"}];

    //  this.points = self.getPointList();

     this.select = function(index){
       if(this.points[index].img=="./full.png")
       {
         this.points.forEach(function(point){
           if(point.id <= index){
             return;
           }
           else{
             point.img = "./empty.png";
           }
         });
       }
       if(this.points[index].img=="./empty.png")
       {
         this.points.forEach(function(point){
           if(point.id > index){
             return;
           }
           else{
             point.img = "./full.png";
           }
         });
       }
     };
    };
  };

  this.selectedPath = new Path("");

  function getPathRating(){
    return VirtuesService.pathCount;
  }
  // this.getPathRating();

  // function getPointList(){
  //     var pointList = [];
  //     for(var i = 0; i < 5; i++){
  //       pointList[2*i+0] = VirtuesService.virtueList[0].points[i];
  //       pointList[2*i+1] = VirtuesService.virtueList[1].points[i];
  //     }
  //     return pointList;
  // }

  function selectPath(){
};
}]);
