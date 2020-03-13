var app = angular.module("site");

app.service("WillpowerService", ['CharCreatorService',
  function(CharCreatorService){

    this.loadedCharacter = false;
    this.freeWillPt = freeWillPt;
    this.selectWillPt = selectWillPt;
    this.getFreebieMode = getFreebieMode;
    this.freeMode = location.hash.includes("free");
    var vm = this;

    function getFreebieMode(){
      return CharCreatorService.freebieMode;
    }

    function freeWillPt(index){
      if(index == 0 && this.willpower.pointCount == 1){
        this.willpower.pointCount = 0;
        this.willpower.zero();
      }
      else{
        this.willpower.pointCount = (index+1);
        this.willpower.select(index, "original");
      }
    }

    function selectWillPt(index){

      if(!CharCreatorService.freebieMode)
        return null;

      if(this.willpower.points[index].type == "original")
        return;

      var pointDiff = this.willpower.pointCount - (index+1);

      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;


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
        this.points = [{id:0, img:"./full.png", type: "original"},
                       {id:1, img:"./empty.png", type: ""},
                       {id:2, img:"./empty.png", type: ""},
                       {id:3, img:"./empty.png", type: ""},
                       {id:4, img:"./empty.png", type: ""},
                       {id:5, img:"./empty.png", type: ""},
                       {id:6, img:"./empty.png", type: ""},
                       {id:7, img:"./empty.png", type: ""},
                       {id:8, img:"./empty.png", type: ""},
                       {id:9, img:"./empty.png", type: ""}];

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
       else{
         this.pointCount = 1;
       }
      };
    };

    this.resetWillpower = resetWillpower;
    function resetWillpower(){
      if(!location.hash.includes("free")){
        this.willpower.points = [{id:0, img:"./full.png", type: "original"},
                                 {id:1, img:"./empty.png", type: ""},
                                 {id:2, img:"./empty.png", type: ""},
                                 {id:3, img:"./empty.png", type: ""},
                                 {id:4, img:"./empty.png", type: ""},
                                 {id:5, img:"./empty.png", type: ""},
                                 {id:6, img:"./empty.png", type: ""},
                                 {id:7, img:"./empty.png", type: ""},
                                 {id:8, img:"./empty.png", type: ""},
                                 {id:9, img:"./empty.png", type: ""}];
        this.willpower.pointCount = 1;
      }
      else{
        this.willpower.points = [{id:0, img:"./empty.png", type: ""},
                                 {id:1, img:"./empty.png", type: ""},
                                 {id:2, img:"./empty.png", type: ""},
                                 {id:3, img:"./empty.png", type: ""},
                                 {id:4, img:"./empty.png", type: ""},
                                 {id:5, img:"./empty.png", type: ""},
                                 {id:6, img:"./empty.png", type: ""},
                                 {id:7, img:"./empty.png", type: ""},
                                 {id:8, img:"./empty.png", type: ""},
                                 {id:9, img:"./empty.png", type: ""}];
        this.willpower.pointCount = 0;
      }
  }

    this.willpower = new Willpower();

  }]);
