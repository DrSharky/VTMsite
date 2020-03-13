var app = angular.module("site");

app.service("BackgroundsService", ['CharCreatorService',
 function(CharCreatorService){

   this.loadedCharacter = false;
   this.freeBackgroundPt = freeBackgroundPt;
   this.backgroundPts = 5;
   this.selectBackgroundPt = selectBackgroundPt;
   this.chooseBackground = chooseBackground;
   this.resetBackgrounds = resetBackgrounds;

   this.backgroundList = ["", "Allies", "Alternate Identity", "Black Hand Memebership",
                          "Contacts", "Domain", "Fame", "Generation",
                          "Herd", "Influence", "Mentor", "Resources",
                          "Retainers", "Rituals", "Status"];

  function freeBackgroundPt(background, index){
    if(index == 0 && background.pointCount == 1){
      background.reset();
    }
    else{
      background.pointCount=(index+1);
      background.select(index, "original");
  }
  }

  function selectBackgroundPt(background, index){
    if(background.name == ""){
      return;
    }
    var pointDiff = background.pointCount - (index+1);

    //Do math to make sure they can't spend points they don't have, even when
    //priorityPts isn't equal to 0.
    //Case example: increase 3 pts when pts = 2.
    if(CharCreatorService.freebieMode){
      if(background.points[index].type == "original")
        return null;

      if((CharCreatorService.getFreebiePts() + pointDiff < 0))
        return null;
    }
    else if((this.backgroundPts + pointDiff < 0))
          return null;

    if(index == background.pointCount - 1 && background.pointCount > 0){
      index -= 1;
      pointDiff = 1;
    }

    if(index == 0 && background.pointCount == 1){
      background.pointCount = 0;
      pointDiff = 1;
      index = -1;
      background.points[0].type = "";
    }
    else{
      //Change the point count in the background.
      background.pointCount = (index+1);
    }

    if(CharCreatorService.freebieMode){
      CharCreatorService.changeFreebiePts(pointDiff);
      background.select(index, "freebie");
    }
    else{
      this.backgroundPts += pointDiff;
      background.select(index, "original");
    }

  };

  var self = this;
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
        this.points.forEach(function(backgroundPt){
          if(backgroundPt.type == "freebie"){
            CharCreatorService.changeFreebiePts(1);
          }
          else if(backgroundPt.type == "original"){
            self.backgroundPts += 1;
          }
          backgroundPt.img = './empty.png';
          backgroundPt.type = "";
        });
        this.pointCount = 0;
      };

      this.select = function(index, type){
        if(index == -1){
          this.pointCount = 0;
          this.points[index+1].img = "./empty.png";
          this.points[index+1].type = "";
          return;
        }
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
   }
 };

  this.selectedList = {0: new Background(""), 1: new Background(""),
                       2: new Background(""), 3: new Background(""),
                       4: new Background(""), 5: new Background("")};

 function chooseBackground(background, index){
   var selectedBackground = this.selectedList[index];
   for(var i = 0; i < Object.values(this.selectedList).length; i++){
     if(this.selectedList[i].name == background.name && i != index){
       selectedBackground.reset();
       selectedBackground.name = "";
      //  chooseBackground(new Background(""), index);
     }
   }
   if(background.name == "" && selectedBackground.pointCount > 0){
     if(CharCreatorService.freebieMode){
       CharCreatorService.changeFreebiePts(selectedBackground.pointCount);
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
   this.selectedList[index].reset();
   delete this.selectedList[index];
 }

 function resetBackgrounds(){
   this.backgroundPts = 5;
   this.selectedList = {0: new Background(""), 1: new Background(""),
                        2: new Background(""), 3: new Background(""),
                        4: new Background(""), 5: new Background("")};
 }

}]);
