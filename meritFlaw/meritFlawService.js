var app = angular.module("site");

app.service("MeritFlawService", ['CharCreatorService',
 function(CharCreatorService){

   this.meritFlawPts = 5;
   this.maxFlawPts = 7;
   this.chooseMeritFlaw = chooseMeritFlaw;
   this.addedFlawPts = 0;

   this.physicalMeritList = ["", "Acute Sense (1pt)", "Ambidextrous (1pt)",
                        "Bruiser (1pt)", "Catlike Balance (1pt)",
                         "Early Riser (1pt)", "Eat Food (1pt)",
                         "Friendly Face (1pt)", "Blush of Health (2pt)",
                         "Enchanting Voice (2pt)", "Daredevil (3pt)",
                         "Efficient Digestion (3pt)", "Huge Size (4pt)"];

  // this.physicalFlawList = {{points: 0, name: ""}, {points:1, name: "Hard of Hearing (1pt)"},
  //                          {points: 1, name: "Short (1pt)"}, {points: 1, name: "Smell of the Grave (1pt)"},
  //                          {points: 1, name: "Tic/Twitch (1pt)"}, {points: 1, name: "Bad Sight (1pt)"},
  //                          {points: 3, name: "Bad Sight (3pt)"}, {points: 2, name: "Fourteenth Generation (2pt)"},
  //                          {points: 4, name: "Fifteenth Generation (4pt)"}, {points: 2, name: "Disfigured (2pt)"},
  //                          {points: 2, name: "Dulled Bite (2pt)"}, {points: 2, name: "Infectious Bite (2pt)"},
  //                          {points: 2, name: "One Eye (2pt)"}, {points: 2, name: "Vulnerability to Silver (2pt)"},
  //                          {points: 2, name: "Open Wound (2pt)"}, {points: 4, name: "Open Wound (4pt)"},
  //                          {points: 3, name: "Addiction (3pt)"}, {points: 3, name: "Child (3pt)"},
  //                          {points: 3, name: "Deformity (3pt)"}, {points 3, name: "Glowing Eyes (3pt)"},
  //                          {points: 3, name: "Lame (3pt)"}, {points: 3, name: "Lazy (3pt)"},
  //                          {points: 3, name: "Monstrous (3pt)"}, {points: 3, name: "Permanent Fangs (3pt)"},
  //                          {points: 3, name: "Permanent Wound (3pt)"}, {points: 3, name: "Slow Healing (3pt)"},
  //                          {points: 4, name: "Disease Carrier (4pt)"}, {points: 4, name: "Deaf (4pt)"},
  //                          {points: 4, name: "Mute (4pt)"}, {points: 4, name: "Thin Blood (4pt)"},
  //                          {points: 5, name: "Flesh of the Corpse (5pt)"}, {points: 5, name: "Infertile Vitae (5pt)"},
  //                          {points: 6, name: "Blind (6pt)"}};

  class MeritFlaw {
    constructor(name, pointCost){
      this.name = name;
      this.pointCost = pointCost;
   }
 };


  this.physicalFlawList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Hard of Hearing (1pt)", 1),
                           2: new MeritFlaw("Short (1pt)", 1), 3: new MeritFlaw("Smell of the Grave (1pt)", 1),
                           4: new MeritFlaw("Tic/Twitch (1pt)", 1), 5: new MeritFlaw("Bad Sight (1pt)", 1),
                           6: new MeritFlaw("Bad Sight (3pt)", 3), 7: new MeritFlaw("Fourteenth Generation (2pt)", 2),
                           8: new MeritFlaw("Fifteenth Generation (4pt)", 4), 9: new MeritFlaw("Disfigured (2pt)", 2),
                           10: new MeritFlaw("Dulled Bite (2pt)", 2), 11: new MeritFlaw("Infectious Bite (2pt)", 2),
                           12: new MeritFlaw("One Eye (2pt)", 2), 13: new MeritFlaw("Vulnerability to Silver (2pt)", 2),
                           14: new MeritFlaw("Open Wound (2pt)", 2), 15: new MeritFlaw("Open Wound (4pt)", 4),
                           16: new MeritFlaw("Addiction (3pt)", 3), 17: new MeritFlaw("Child (3pt)", 3),
                           18: new MeritFlaw("Deformity (3pt)", 3), 19: new MeritFlaw("Glowing Eyes", 3),
                           20: new MeritFlaw("Lame (3pt)", 3), 21: new MeritFlaw("Lazy (3pt)", 3),
                           22: new MeritFlaw("Monstrous (3pt)", 3), 23: new MeritFlaw("Permanent Fangs (3pt)", 3),
                           24: new MeritFlaw("Permanent Wound (3pt)", 3), 25: new MeritFlaw("Slow Healing (3pt)", 3),
                           26: new MeritFlaw("Disease Carrier (4pt)", 4), 27: new MeritFlaw("Deaf (4pt)", 4),
                           28: new MeritFlaw("Mute (4pt)", 4), 29: new MeritFlaw("Thin Blood (4pt)", 4),
                           30: new MeritFlaw("Flesh of the Corpse (5pt)", 5), 31: new MeritFlaw("Infertile Vitae (5pt)", 5),
                           32: new MeritFlaw("Blind (6pt)", 6)};

 this.physicalFlaws = {};

 function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
   if(prevMeritFlaw)
    CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost);
   switch(category){
     case "physicalFlaw":
      if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
        this.physicalFlaws[meritFlaw.name] = meritFlaw;
        CharCreatorService.changeFreebiePts(meritFlaw.pointCost);
      }
      break;
   }
  //  var selectedMeritFlaw = this.selectedList[index];
  //  if(meritFlaw.name == "" && selectedMeritFlaw.pointCount > 0){
  //    if(CharCreatorService.freebieMode){
  //      CharCreatorService.changeFreebiePts(selectedMeritFlaw.pointCount);
  //    }
  //    else{
  //      this.meritFlawPts += meritFlaw.pointCount;
  //    }
  //    selectedMeritFlaw.reset();
  //  }
  //  selectedMeritFlaw.name = meritFlaw.name;
 }

 this.addMeritFlaw = addMeritFlaw;
 function addMeritFlaw(name = "", pointCount = 0, points = []){
   var index = Object.keys(this.selectedList).length;
   if(name == "")
     this.selectedList[index] = new MeritFlaw("");
   else{
     this.selectedList[index] = new MeritFlaw(name);
     this.selectedList[index].pointCount = pointCount;
     this.selectedList[index].points = points;
   }
 }

 this.removeMeritFlaw = removeMeritFlaw;
 function removeMeritFlaw(index){
   this.selectedList[index].reset();
   delete this.selectedList[index];
 }

}]);
