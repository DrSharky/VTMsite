var app = angular.module("site");

app.service("VirtuesService",
 ['CharCreatorService', 'PathService', 'WillpowerService',
 function(CharCreatorService, PathService, WillpowerService){

   this.virtuePts = 7;
   this.selectVirtuePt = selectVirtuePt;

   function selectVirtuePt(virtue, index){

     var pointDiff = 0;

     //Different operations if using Freebie points.
     if(CharCreatorService.freebieMode){
       var virtueFree = CharCreatorService.getFreebiePts();

       if(index < virtue.pointCount - 1)
         pointDiff = (virtue.pointCount * 2) - (index + 1 * 2);
       if((index == virtue.pointCount-1)){
         pointDiff = (virtue.pointCount * 2) - (index * 2);
         index -= 1;
       }
       else if(index > virtue.pointCount-1)
         pointDiff = ((virtue.pointCount-1) * 2) + (-2 * index);

       if(virtueFree + pointDiff < 0)
         return null;

       CharCreatorService.changeFreebiePts(pointDiff);
       virtue.pointCount = (index+1);
       virtue.select(index);
       return;
     }
     else
        pointDiff = virtue.pointCount - (index+1);

     //Do math to make sure they can't spend points they don't have, even when
     //priorityPts isn't equal to 0.
     //Case example: increase 3 pts when pts = 2.
     if((this.virtuePts + pointDiff < 0))
       return null;

     if(index == 0 && virtue.pointCount == 1){
       pointDiff = 0;
     }
     else{
       //Change the point count in the virtue.
       virtue.pointCount = (index+1);
     }

     if(virtue.name != "Courage"){
       PathService.selectedPath.pointCount += (-pointDiff);
       PathService.selectedPath.select(PathService.selectedPath.pointCount-1);
       PathService.selectedPath.pointMin = PathService.selectedPath.pointCount;
     }
     else{
       var willpower = WillpowerService.willpower;
       willpower.pointCount +=(-pointDiff);
       willpower.select(willpower.pointCount-1);
       willpower.pointMin = willpower.pointCount;
     }

     this.virtuePts += pointDiff;
     //Fill in the dots!
     virtue.select(index);
   };

  var vm = this;

  class Virtue {
    constructor(name){
      this.name = name;
      if(name == "Conscience")
        this.displayName = "Conscience/Conviction";
      else{
        if(name == "Self-control")
          this.displayName = "Self-Control/Instinct"
        else
          this.displayName = name;
        }
      this.pointCount = 1;
      this.points = [{id:0, img:"./full.png"},
                     {id:1, img:"./empty.png"},
                     {id:2, img:"./empty.png"},
                     {id:3, img:"./empty.png"},
                     {id:4, img:"./empty.png"}];

      this.reset = function(){
        vm.virtuePts += (this.pointCount - 1);
        this.pointCount = 1;
        this.points.forEach(function(point){
          if(point.id == 0)
            point.img = "./full.png";
          else {
            point.img = "./empty.png";
          }
        });
      }

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

      this.zero = function(){
        this.points.forEach(function(virtue){
          virtue.img = './empty.png';
        });
      };
    };
  };

  this.virtueList = {"Conscience": new Virtue("Conscience"),
                     "Self-control": new Virtue("Self-control"),
                     "Courage": new Virtue("Courage")};

  this.pathCount = this.virtueList["Conscience"].pointCount + this.virtueList["Self-control"].pointCount;

}]);
