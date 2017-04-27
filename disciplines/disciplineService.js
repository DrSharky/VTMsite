var app = angular.module("site");

app.service("DisciplineService", function(){

  class Discipline {
    constructor(name){
      this.name = name;
      this.pointCount = 0;
      this.points = [{id: 0, img: "./empty.png"},
                     {id: 1, img: "./empty.png"},
                     {id: 2, img: "./empty.png"},
                     {id: 3, img: "./empty.png"},
                     {id: 4, img: "./empty.png"}];

      this.reset = function(){
        this.points.forEach(function(ability){
          ability.img = './empty.png';
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

});
