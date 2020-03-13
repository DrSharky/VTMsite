var app = angular.module("site");

app.service("PathService",
 ['CharCreatorService',
 function(CharCreatorService){

   this.loadedCharacter = false;
   this.pathList = ["Humanity", "Path of Asakku", "Path of the Beast", "Path of Blood",
                    "Path of Bones", "Path of Caine", "Path of Cathari",
                    "Path of Death and the Soul", "Path of Ecstasy", "Path of Entelechy",
                    "Path of Evil Revelations", "Path of the Feral Heart", "Path of Harmony",
                    "Path of the Hive", "Path of Honorable Accord", "Path of Lilith",
                    "Path of Metamorphosis", "Path of Night", "Path of Orion",
                    "Path of Paradox (Mayaparisatya)", "Path of Paradox (Samsara)",
                    "Path of Paradox (Western)", "Path of Power and the Inner Voice",
                    "Path of Redemption", "Path of Typhon", "Path of Self-Focus",
                    "Path of the Scorched Heart", "Sharia El-Sama", "Path of the Warrior"];

  this.freePathPt = freePathPt;
  this.selectPathPt = selectPathPt;
  this.freeMode = location.hash.includes("free");
  var vm = this;

  function freePathPt(path, index){
    if(index == 0 && path.pointCount == 1){
      path.pointCount = 0;
      path.zero();
    }
    else{
      path.pointCount = (index+1);
      path.select(index, "original");
    }
  }

  function selectPathPt(path, index){

    if(!CharCreatorService.freebieMode)
      return null;

    if(path.name == "")
      return;

    if(index == 0)
      index = 1;

    var pointDiff = path.pointCount - (index+1);

    if((CharCreatorService.getFreebiePts() + pointDiff < 0))
      return null;

    if(path.points[index].type == "original")
      return;

    if(index == path.pointCount - 1){
      pointDiff = 1;
      index -= 1;
    }

    CharCreatorService.changeFreebiePts(pointDiff);
    path.select(index, "freebie");
    path.pointCount = index+1;
  };

  var self = this;
  class Path{
    constructor(name){

      this.name = name;
      this.pointCount = 2;
      this.pointMin = 2;
      this.points = [{id:0, img:"./full.png", type: "original"},
                     {id:1, img:"./full.png", type: "original"},
                     {id:2, img:"./empty.png", type: ""},
                     {id:3, img:"./empty.png", type: ""},
                     {id:4, img:"./empty.png", type: ""},
                     {id:5, img:"./empty.png", type: ""},
                     {id:6, img:"./empty.png", type: ""},
                     {id:7, img:"./empty.png", type: ""},
                     {id:8, img:"./empty.png", type: ""},
                     {id:9, img:"./empty.png", type: ""}];
      this.zero = function(){
       this.points.forEach(function(point){
        point.img = "./empty.png";
        point.type = "";
       });
     };
     if(vm.freeMode){
       this.pointCount = 0;
       this.zero();
     }
     this.select = function(index, type){
       if(this.points[index].img=="./full.png" ||
          this.points[index].img=="./free.png")
       {
         this.points.forEach(function(point){
           if(point.id <= index){
             return;
           }
           else{
             point.img = "./empty.png";
             point.type = "";
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
             if(type == "freebie" && point.img != "./full.png"){
               point.img = "./free.png"
               point.type = "freebie";
             }
             else{
             point.img = "./full.png";
             point.type = "original";
           }
           }
         });
       }
     };
    };
  };

  this.resetPath = resetPath;
  function resetPath(){
    if(!location.hash.includes("free")){
      this.selectedPath.points = [{id:0, img:"./full.png", type: "original"},
                                  {id:1, img:"./full.png", type: "original"},
                                  {id:2, img:"./empty.png", type: ""},
                                  {id:3, img:"./empty.png", type: ""},
                                  {id:4, img:"./empty.png", type: ""},
                                  {id:5, img:"./empty.png", type: ""},
                                  {id:6, img:"./empty.png", type: ""},
                                  {id:7, img:"./empty.png", type: ""},
                                  {id:8, img:"./empty.png", type: ""},
                                  {id:9, img:"./empty.png", type: ""}];
      this.selectedPath.name = "";
      this.selectedPath.pointCount = 2;
    }
    else{
      this.selectedPath.points = [{id:0, img:"./empty.png", type: ""},
                                  {id:1, img:"./empty.png", type: ""},
                                  {id:2, img:"./empty.png", type: ""},
                                  {id:3, img:"./empty.png", type: ""},
                                  {id:4, img:"./empty.png", type: ""},
                                  {id:5, img:"./empty.png", type: ""},
                                  {id:6, img:"./empty.png", type: ""},
                                  {id:7, img:"./empty.png", type: ""},
                                  {id:8, img:"./empty.png", type: ""},
                                  {id:9, img:"./empty.png", type: ""}];
       this.selectedPath.name = "";
       this.selectedPath.pointCount = 0;
    }
  };

  this.selectedPath = new Path("");

}]);
