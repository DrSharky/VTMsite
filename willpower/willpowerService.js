var app = angular.module("site");

app.service("WillpowerService", ['CharCreatorService',
  function(CharCreatorService){

    this.selectWillPt = selectWillPt;
    this.getFreebieMode = getFreebieMode;
    function getFreebieMode(){
      return CharCreatorService.freebieMode;
    }

    function selectWillPt(index){
                                            //TODO: debug the point minimum
      if(!CharCreatorService.freebieMode || index < this.willpower.pointMin)
        return null;

      var pointDiff = this.willpower.pointCount - (index+1);

      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;

      CharCreatorService.changeFreebiePts(pointDiff);
      this.willpower.select(index);
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

    this.willpower = new Willpower();

  }]);
