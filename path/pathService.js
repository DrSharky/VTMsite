var app = angular.module("site");

app.service("PathService",
 ['CharCreatorService',
 function(CharCreatorService){

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

  this.selectPathPt = selectPathPt;

  function selectPathPt(path, index){

    if(path.name == ""|| index <= 1)
      return;
    var pointDiff = path.pointCount - (index+1);

    if(CharCreatorService.freebieMode){
      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;
    }

    if(index == 0 && path.pointCount == 1){
      path.pointCount = 0;
      pointDiff = 1;
      index = -1;
    }

    if(CharCreatorService.freebieMode)
      CharCreatorService.changeFreebiePts(pointDiff);

      path.select(index);
  };

  var self = this;
  class Path{
    constructor(name){

      this.name = name;
      this.pointCount = 2;
      this.points = [{id:0, img:"./full.png"},
                     {id:1, img:"./full.png"},
                     {id:2, img:"./empty.png"},
                     {id:3, img:"./empty.png"},
                     {id:4, img:"./empty.png"},
                     {id:5, img:"./empty.png"},
                     {id:6, img:"./empty.png"},
                     {id:7, img:"./empty.png"},
                     {id:8, img:"./empty.png"},
                     {id:9, img:"./empty.png"}];

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

}]);
