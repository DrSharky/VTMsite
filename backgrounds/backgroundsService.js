var app = angular.module("site");

app.service("BackgroundsService", ['CharCreatorService',
 function(CharCreatorService){

   this.backgroundPts = 5;
   this.selectBackgroundPt = selectBackgroundPt;
   this.chooseBackground = chooseBackground;

   this.backgroundList = ["", "Allies", "Alternate Identity", "Black Hand Memebership",
                          "Contacts", "Domain", "Fame", "Generation",
                          "Herd", "Influence", "Mentor", "Resources",
                          "Retainers", "Rituals", "Status"];

  function selectBackgroundPt(background, index){
    if(background.name == ""){
      return;
    }
    var pointDiff = background.pointCount - (index+1);

    //Do math to make sure they can't spend points they don't have, even when
    //priorityPts isn't equal to 0.
    //Case example: increase 3 pts when pts = 2.
    if(CharCreatorService.freebieMode){
      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;
    }
    else if((this.backgroundPts + pointDiff < 0))
          return null;

    if(index == 0 && background.pointCount == 1){
      background.pointCount = 0;
      pointDiff = 1;
      index = -1;
    }
    else{
      //Change the point count in the background.
      background.pointCount = (index+1);
    }

    if(CharCreatorService.freebieMode)
      CharCreatorService.changeFreebiePts(pointDiff);
    else
      this.backgroundPts += pointDiff;

    //Fill in the dots!
    background.select(index);
  };

  class Background {
    constructor(name){
      this.name = name;
      this.pointCount = 0;
      this.points = [{id: 0, img: "./empty.png"},
                     {id: 1, img: "./empty.png"},
                     {id: 2, img: "./empty.png"},
                     {id: 3, img: "./empty.png"},
                     {id: 4, img: "./empty.png"}];

      this.reset = function(){
        this.points.forEach(function(background){
          background.img = './empty.png';
        });
        this.pointCount = 0;
      };

      this.select = function(index){
        if(index == -1){
          this.reset();
          return;
        }
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
    }
  };

  this.selectedList = [new Background(""), new Background(""),
                       new Background(""), new Background(""),
                       new Background(""), new Background("")];

 function chooseBackground(background, index){
   var selectedBackground = this.selectedList[index];
   if(background.name == "" && selectedBackground.pointCount > 0){
     if(CharCreatorService.freebieMode){
       CharCreatorService.changeFreebiePts(selectedBackground.pointCount);
     }
     else{
       this.backgroundPts += background.pointCount;
     }
     selectedBackground.reset();
   }
   selectedBackground.name = background.name;
 }

}]);
