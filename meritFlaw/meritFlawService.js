var app = angular.module("site");

app.service("MeritFlawService", ['CharCreatorService',
 function(CharCreatorService){

   this.meritFlawPts = 5;
   this.maxFlawPts = 7;
   this.chooseMeritFlaw = chooseMeritFlaw;
   this.addedFlawPts = 0;

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

 this.physicalMeritList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Acute Sense (1pt)", 1),
                           2: new MeritFlaw("Ambidextrous (1pt)", 1), 3: new MeritFlaw("Bruiser (1pt)", 1),
                           4: new MeritFlaw("Catlike Balance (1pt)", 1), 5: new MeritFlaw("Early Riser (1pt)", 1),
                           6: new MeritFlaw("Eat Food (1pt)", 1), 7: new MeritFlaw("Friendly Face (1pt)", 1),
                           8: new MeritFlaw("Blush of Health (2pt)", 2), 9: new MeritFlaw("Enchanting Voice (2pt)", 2),
                           10: new MeritFlaw("Daredevil (3pt)", 3), 11: new MeritFlaw("Efficient Digestion (3pt)", 3),
                           12: new MeritFlaw("Huge Size (4pt)", 4)};

 this.mentalMeritList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Coldly Logical (1pt)", 1),
                         2: new MeritFlaw("Common Sense (1pt)", 1), 3: new MeritFlaw("Concentration (1pt)", 1),
                         4: new MeritFlaw("Introspection (1pt)", 1), 5: new MeritFlaw("Language (1pt)", 1),
                         6: new MeritFlaw("Time Sense (1pt)", 1), 7: new MeritFlaw("Useful Knowledge (1pt)", 1),
                         8: new MeritFlaw("Code of Honor (2pt)", 2), 9: new MeritFlaw("Computer Aptitude (2pt)", 2),
                         10: new MeritFlaw("Eidetic Memory (2pt)", 2), 11: new MeritFlaw("Light Sleeper (2pt)", 2),
                         12: new MeritFlaw("Natural Linguist (2pt)", 2), 13: new MeritFlaw("Calm Heart (3pt)", 3),
                         14: new MeritFlaw("Iron Will (3pt)", 3), 15: new MeritFlaw("Precocious (3pt)", 3)};

 this.mentalFlawList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Deep Sleeper (1pt)", 1),
                        2: new MeritFlaw("Impatient (1pt)", 1), 3: new MeritFlaw("Nightmares (1pt)", 1),
                        4: new MeritFlaw("Prey Exclusion (1pt)", 1), 5: new MeritFlaw("Shy (1pt)", 1),
                        6: new MeritFlaw("Soft-Hearted (1pt)", 1), 7: new MeritFlaw("Speech Impediment (1pt)", 1),
                        8: new MeritFlaw("Unconvinced (1pt)", 1), 9: new MeritFlaw("Amnesia (2pt)", 2),
                        10: new MeritFlaw("Lunacy (2pt)", 2), 11: new MeritFlaw("Phobia (2pt)", 2),
                        12: new MeritFlaw("Short Fuse (2pt)", 2), 13: new MeritFlaw("Stereotype (2pt)", 2),
                        14: new MeritFlaw("Territorial (2pt)", 2), 15: new MeritFlaw("Thirst for Innocence (2pt)", 2),
                        16: new MeritFlaw("Vengeful (2pt)", 2), 17: new MeritFlaw("Victim of the Masquerade (2pt)", 2),
                        18: new MeritFlaw("Weak-Willed (3pt)", 3), 19: new MeritFlaw("Conspicuous Consumption (4pt)", 4),
                        20: new MeritFlaw("Guilt-Wracked (4pt)", 4), 21: new MeritFlaw("Flashbacks (6pt)", 6)};


 this.socialMeritList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Elysium Regular (1pt)", 1),
                         2: new MeritFlaw("Former Ghoul (1pt)", 1), 3: new MeritFlaw("Harmless (1pt)", 1),
                         4: new MeritFlaw("Natural Leader (1pt)", 1), 5: new MeritFlaw("Prestigious Sire (1pt)", 1),
                         6: new MeritFlaw("Protege (1pt)", 1), 7: new MeritFlaw("Rep (1pt)", 1),
                         8: new MeritFlaw("Sabbat Survivor (1pt)", 1), 9: new MeritFlaw("Boon (1pt)", 1),
                         10: new MeritFlaw("Boon (2pt)", 2), 11: new MeritFlaw("Boon (3pt)", 3),
                         12: new MeritFlaw("Boon (4pt)", 4), 13: new MeritFlaw("Boon (5pt)", 5),
                         14: new MeritFlaw("Boon (6pt)", 6), 15: new MeritFlaw("Bullyboy (2pt)", 2),
                         16: new MeritFlaw("Old Pal (2pt)", 2), 17: new MeritFlaw("Lawman's Friend (2pt)", 2),
                         18: new MeritFlaw("Open Road (2pt)", 2), 19: new MeritFlaw("Sanctity (2pt)", 2),
                         20: new MeritFlaw("Scholar of Enemies (2pt)", 2), 21: new MeritFlaw("Scholar of Others (2pt)", 2),
                         22: new MeritFlaw("Friend of the Underground (3pt)", 3), 23: new MeritFlaw("Mole (3pt)", 3),
                         24: new MeritFlaw("Rising Star (3pt)", 3), 25: new MeritFlaw("Broken Bond (4pt)", 4),
                         26: new MeritFlaw("Clan Friendship (4pt)", 4), 27: new MeritFlaw("Primogen/Bishop Friendship (4pt)", 4)};

 this.socialFlawList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Botched Presentation (1pt)", 1),
                        2: new MeritFlaw("Dark Secret (1pt)", 1), 3: new MeritFlaw("Expendable (1pt)", 1),
                        4: new MeritFlaw("Incomplete Understanding (1pt)", 1), 5: new MeritFlaw("Infamous Sire (1pt)", 1),
                        6: new MeritFlaw("Mistaken Identity (1pt)", 1), 7: new MeritFlaw("New Arrival (1pt)", 1),
                        8: new MeritFlaw("New Kid (1pt)", 1), 9: new MeritFlaw("Recruitment Target (1pt)", 1),
                        10: new MeritFlaw("Sire's Resentment (1pt)", 1), 11: new MeritFlaw("Special Responsibility (1pt)", 1),
                        12: new MeritFlaw("Sympathizer (1pt)", 1), 13: new MeritFlaw("Enemy (1pt)", 1),
                        14: new MeritFlaw("Enemy (2pt)", 2), 15: new MeritFlaw("Enemy (3pt)", 3),
                        16: new MeritFlaw("Enemy (4pt)", 4), 17: new MeritFlaw("Enemy (5pt)", 5),
                        18: new MeritFlaw("Bound (2pt)", 2), 19: new MeritFlaw("Catspaw (2pt)", 2),
                        20: new MeritFlaw("Escaped Target (2pt)", 2), 21: new MeritFlaw("Failure (2pt)", 2),
                        22: new MeritFlaw("Masquerade Breaker (2pt)", 2), 23: new MeritFlaw("Hunted (2pt)", 2),
                        24: new MeritFlaw("Old Flame (2pt)", 2), 25: new MeritFlaw("Rival Sires (2pt)", 2),
                        26: new MeritFlaw("Uppity (2pt)", 2), 27: new MeritFlaw("Disgrace to the Blood (3pt)", 3),
                        28: new MeritFlaw("Former Prince (3pt)", 3), 29: new MeritFlaw("Hunted Like a Dog (3pt)", 3),
                        30: new MeritFlaw("Narc (3pt)", 3), 31: new MeritFlaw("Sleeping With the Enemy (3pt)", 3),
                        32: new MeritFlaw("Clan Enmity (4pt)", 4), 33: new MeritFlaw("Loathsome Regnant (4pt)", 4),
                        34: new MeritFlaw("Overextended (4pt)", 4), 35: new MeritFlaw("Probationary Sect Member (4pt)", 4),
                        36: new MeritFlaw("Blood Hunted (4pt)", 4), 37: new MeritFlaw("Blood Hunted (6pt)", 6),
                        38: new MeritFlaw("Laughingstock (5pt)", 5), 39: new MeritFlaw("Red List (7pt)", 7)};

 this.supernaturalMeritList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Deceptive Aura (1pt)", 1),
                               2: new MeritFlaw("Healing Touch (1pt)", 1), 3: new MeritFlaw("Inoffensive to Animals (1pt)", 1),
                               4: new MeritFlaw("Medium (2pt)", 2), 5: new MeritFlaw("Magic Resistance (2pt)", 2),
                               6: new MeritFlaw("Hidden Diablerie (3pt)", 3), 7: new MeritFlaw("Lucky (3pt)", 3),
                               8: new MeritFlaw("Oracular Ability (3pt)", 3), 9: new MeritFlaw("Spirit Mentor (3pt)", 3),
                               10: new MeritFlaw("True Love (4pt)", 4), 11: new MeritFlaw("Additional Discipline (5pt)", 5),
                               12: new MeritFlaw("Unbondable (5pt)", 5), 13: new MeritFlaw("Nine Lives (6pt)", 6),
                               14: new MeritFlaw("True Faith (7pt)", 7)};

 this.supernaturalFlawList = {0: new MeritFlaw("", 0), 1: new MeritFlaw("Cast No Reflection (1pt)", 1),
                              2: new MeritFlaw("Cold Breeze (1pt)", 1), 3: new MeritFlaw("Repulsed by Garlic (1pt)", 1),
                              4: new MeritFlaw("Touch of Frost (1pt)", 1), 5: new MeritFlaw("Cursed (1pt)", 1),
                              6: new MeritFlaw("Cursed (2pt)", 2), 7: new MeritFlaw("Cursed (3pt)", 3),
                              8: new MeritFlaw("Cursed (4pt)", 4), 9: new MeritFlaw("Cursed (5pt)", 5),
                              10: new MeritFlaw("Beacon of the Unholy (2pt)", 2), 11: new MeritFlaw("Deathsight (2pt)", 2),
                              12: new MeritFlaw("Eerie Presence (2pt)", 2), 13: new MeritFlaw("Lord of the Flies (2pt)", 2),
                              14: new MeritFlaw("Can't Cross Running Water (3pt)", 3), 15: new MeritFlaw("Haunted (3pt)", 3),
                              16: new MeritFlaw("Repelled by Crosses (3pt)", 3), 17: new MeritFlaw("Grip of the Damned (4pt)", 4),
                              18: new MeritFlaw("Dark Fate (5pt)", 5), 19: new MeritFlaw("Light-Sensitive (5pt)", 5)};

 this.selectedPhysicalMerits = {0: new MeritFlaw("", 0)};
 this.selectedPhysicalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedMentalMerits = {0: new MeritFlaw("", 0)};
 this.selectedMentalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSocialMerits = {0: new MeritFlaw("", 0)};
 this.selectedSocialFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSupernaturalMerits = {0: new MeritFlaw("", 0)};
 this.selectedSupernaturalFlaws = {0: new MeritFlaw("", 0)};


 function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
   switch(category){
      case "physicalMerit":
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedPhysicalMerits[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
          break;
        }
     case "physicalFlaw":
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedPhysicalFlaws[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost);
        }
        break;
     case "mentalMerit":
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedMentalMerits[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "mentalFlaw":
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedMentalFlaws[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost);
        }
        break;
     case "socialMerit":
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSocialMerits[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "socialFlaw":
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedSocialFlaws[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost);
        }
        break;
     case "supernaturalMerit":
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSupernaturalMerits[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "supernaturalFlaw":
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedSupernaturalFlaws[index] = meritFlaw;
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost);
        }
        break;
     default:
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
 function addMeritFlaw(category){
   switch(category){
     case "physicalMerit":
        var index = Object.keys(this.selectedPhysicalMerits).length;
        this.selectedPhysicalMerits[index] = new MeritFlaw("", 0);
        break;
     case "physicalFlaw":
        var index = Object.keys(this.selectedPhysicalFlaws).length;
        this.selectedPhysicalFlaws[index] = new MeritFlaw("", 0);
        break;
     case "mentalMerit":
        var index = Object.keys(this.selectedMentalMerits).length;
        this.selectedMentalMerits[index] = new MeritFlaw("", 0);
        break;
     case "mentalFlaw":
        var index = Object.keys(this.selectedMentalFlaws).length;
        this.selectedMentalFlaws[index] = new MeritFlaw("", 0);
        break;
   }
  //  var index = Object.keys(this.selectedList).length;
  //  if(name == "")
  //    this.selectedList[index] = new MeritFlaw("");
  //  else{
  //    this.selectedList[index] = new MeritFlaw(name);
  //    this.selectedList[index].pointCount = pointCount;
  //    this.selectedList[index].points = points;
  //  }
 }

 this.removeMeritFlaw = removeMeritFlaw;
 function removeMeritFlaw(index){
   this.selectedList[index].reset();
   delete this.selectedList[index];
 }

}]);
