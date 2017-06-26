var app = angular.module("site");

app.service("WillpowerService", ['CharCreatorService',
  function(CharCreatorService){

    this.selectWillPt = selectWillPt;
    this.getFreebieMode = getFreebieMode;
    function getFreebieMode(){
      return CharCreatorService.freebieMode;
    }

    function selectWillPt(index){

      if(!CharCreatorService.freebieMode)
        return null;

      var pointDiff = this.willpower.pointCount - (index+1);

      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;

      if(this.willpower.points[index] == "original")
        return;

      if(index == this.willpower.pointCount - 1){
        pointDiff = 1;
        index -= 1;
      }

      if(index == -1)
        return;

      CharCreatorService.changeFreebiePts(pointDiff);
      this.willpower.select(index, "freebie");
      this.willpower.pointCount = index+1;
    };

    class Willpower{
      constructor(){

        this.pointCount = 1;
        this.pointMin = 1;
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
                 point.img = "./free.png";
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

    this.willpower = new Willpower();

  }]);
