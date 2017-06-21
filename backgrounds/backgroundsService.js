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
      this.points = [{id: 0, img: "./empty.png", type:""},
                     {id: 1, img: "./empty.png", type:""},
                     {id: 2, img: "./empty.png", type:""},
                     {id: 3, img: "./empty.png", type:""},
                     {id: 4, img: "./empty.png", type:""}];

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

  this.selectedList = {0: new Background(""), 1: new Background(""),
                       2: new Background(""), 3: new Background(""),
                       4: new Background(""), 5: new Background("")};

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

 this.addBackground = addBackground;
 function addBackground(name = "", pointCount = 0, points = []){
   var index = Object.keys(this.selectedList).length;
   if(name == "")
     this.selectedList[index] = new Background("");
   else{
     this.selectedList[index] = new Background(name);
     this.selectedList[index].pointCount = pointCount;
     this.selectedList[index].points = points;
   }
 }

 this.removeBackground = removeBackground;
 function removeBackground(index){
   delete this.selectedList[index];
 }

}]);
