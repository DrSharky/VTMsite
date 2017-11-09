var app = angular.module("site");

app.service("MeritFlawService", ['CharCreatorService',
 function(CharCreatorService){

   this.maxFlawPts = 7;
   this.addedFlawPts = 0;
   this.meritCount = 0;
   this.flawCount = 0;

  class MeritFlaw {
    constructor(name, pointCost){
      this.name = name;
      this.pointCost = pointCost;
   }
 };

 this.masterMeritList;
 this.masterFlawList;

 this.physicalMeritList = {"": 0, "Acute Sense (1pt)": 1, "Ambidextrous (2pt)": 1, "Bruiser (1pt)": 1, "Catlike Balance (1pt)": 1,
                           "Early Riser (1pt)": 1, "Eat Food (1pt)": 1, "Friendly Face (1pt)": 1, "Blush of Health (2pt)": 2,
                           "Enchanting Voice (2pt)": 2, "Daredevil (3pt)": 3, "Efficient Digestion (3pt)": 3, "Huge Size (4pt)": 4};

 this.physicalFlawList = {"": 0, "Hard of Hearing (1pt)": 1, "Short (1pt)": 1, "Smell of the Grave (1pt)": 1,
                          "Tic/Twitch (1pt)": 1, "Bad Sight (1pt)": 1, "Bad Sight (3pt)": 3, "Fourteenth Generation (2pt)": 2,
                          "Fifteenth Generation (4pt)": 4, "Disfigured (2pt)": 2, "Dulled Bite (2pt)": 2, "Infectious Bite (2pt)": 2,
                          "One Eye (2pt)":2, "Vulnerability to Silver (2pt)": 2, "Open Wound (2pt)": 2, "Open Wound (4pt)": 4,
                          "Addiction (3pt)": 3, "Child (3pt)": 3, "Deformity (3pt)": 3, "Glowing Eyes (3pt)": 3,
                          "Lame (3pt)": 3, "Lazy (3pt)": 3, "Monstrous (3pt)": 3, "Permanent Fangs (3pt)": 3,
                          "Permanent Wound (3pt)": 3, "Slow Healing (3pt)": 3, "Disease Carrier (4pt)": 4, "Deaf (4pt)": 4,
                          "Mute (4pt)": 4, "Thin Blood (4pt)": 4, "Flesh of the Corpse (5pt)": 5, "Infertile Vitae (5pt)": 5,
                          "Blind (6pt)": 6};

 this.mentalMeritList = {"": 0, "Coldly Logical (1pt)": 1, "Common Sense (1pt)": 1, "Concentration (1pt)": 1,
                         "Introspection (1pt)": 1, "Language (1pt)": 1, "Time Sense (1pt)": 1, "Useful Knowledge (1pt)": 1,
                         "Code of Honor (2pt)": 2,"Computer Aptitude (2pt)": 2, "Eidetic Memory (2pt)": 2, "Light Sleeper (2pt)": 2,
                         "Natural Linguist (2pt)": 2, "Calm Heart (3pt)": 3, "Iron Will (3pt)": 3, "Precocious (3pt)": 3};

 this.mentalFlawList = {"": 0, "Deep Sleeper (1pt)": 1, "Impatient (1pt)": 1, "Nightmares (1pt)": 1,
                        "Prey Exclusion (1pt)": 1, "Shy (1pt)": 1, "Soft-Hearted (1pt)": 1, "Speech Impediment (1pt)": 1,
                        "Unconvinced (1pt)": 1, "Amnesia (2pt)": 2, "Lunacy (2pt)": 2, "Phobia (2pt)": 2,
                        "Short Fuse (2pt)": 2, "Stereotype (2pt)": 2, "Territorial (2pt)": 2, "Thirst for Innocence (2pt)": 2,
                        "Vengeful (2pt)": 2, "Victim of the Masquerade (2pt)": 2, "Weak-Willed (3pt)": 3, "Conspicuous Consumption (4pt)": 4,
                        "Guilt-Wracked (4pt)": 4, "Flashbacks (6pt)": 6};

 this.socialMeritList = {"": 0, "Elysium Regular (1pt)": 1, "Former Ghoul (1pt)": 1, "Harmless (1pt)": 1,
                         "Natural Leader (1pt)": 1, "Prestigious Sire (1pt)": 1, "Protege (1pt)": 1, "Rep (1pt)": 1,
                         "Sabbat Survivor (1pt)": 1, "Boon (1pt)": 1, "Boon (2pt)": 2, "Boon (3pt)": 3,
                         "Boon (4pt)": 4, "Boon (5pt)": 5, "Boon (6pt)": 6, "Bullyboy (2pt)": 2,
                         "Old Pal (2pt)": 2, "Lawman's Friend (2pt)": 2, "Open Road (2pt)": 2, "Sanctity (2pt)": 2,
                         "Scholar of Enemies (2pt)": 2, "Scholar of Others (2pt)": 2, "Friend of the Underground (3pt)": 3, "Mole (3pt)": 3,
                         "Rising Star (3pt)": 3, "Broken Bond (4pt)": 4, "Clan Friendship (4pt)": 4, "Primogen/Bishop Friendship (4pt)": 4};

 this.socialFlawList = {"": 0, "Botched Presentation (1pt)": 1, "Dark Secret (1pt)": 1, "Expendable (1pt)": 1,
                        "Incomplete Understanding (1pt)": 1, "Infamous Sire (1pt)": 1, "Mistaken Identity (1pt)": 1, "New Arrival (1pt)": 1,
                        "New Kid (1pt)": 1, "Recruitment Target (1pt)": 1, "Sire's Resentment (1pt)": 1, "Special Responsibility (1pt)": 1,
                        "Sympathizer (1pt)": 1, "Enemy (1pt)": 1, "Enemy (2pt)": 2, "Enemy (3pt)": 3,
                        "Enemy (4pt)": 4, "Enemy (5pt)": 5, "Bound (2pt)": 2, "Catspaw (2pt)": 2,
                        "Escaped Target (2pt)": 2, "Failure (2pt)": 2, "Masquerade Breaker (2pt)": 2, "Hunted (2pt)": 2,
                        "Old Flame (2pt)": 2, "Rival Sires (2pt)": 2, "Uppity (2pt)": 2, "Disgrace to the Blood (3pt)": 3,
                        "Former Prince (3pt)": 3, "Hunted Like a Dog (3pt)": 3, "Narc (3pt)": 3, "Sleeping With the Enemy (3pt)": 3,
                        "Clan Enmity (4pt)": 4, "Loathsome Regnant (4pt)": 4, "Overextended (4pt)": 4, "Probationary Sect Member (4pt)": 4,
                        "Blood Hunted (4pt)": 4, "Blood Hunted (6pt)": 6, "Laughingstock (5pt)": 5, "Red List (7pt)": 7};

 this.supernaturalMeritList = {"": 0, "Deceptive Aura (1pt)": 1, "Healing Touch (1pt)": 1, "Inoffensive to Animals (1pt)": 1,
                               "Medium (2pt)": 2, "Magic Resistance (2pt)": 2, "Hidden Diablerie (3pt)": 3, "Lucky (3pt)": 3,
                               "Oracular Ability (3pt)": 3, "Spirit Mentor (3pt)": 3, "True Love (4pt)": 4, "Additional Discipline (5pt)": 5,
                               "Unbondable (5pt)": 5, "Nine Lives (6pt)": 6, "True Faith (7pt)": 7};

 this.supernaturalFlawList = {"": 0, "Cast No Reflection (1pt)": 1, "Cold Breeze (1pt)": 1, "Repulsed by Garlic (1pt)": 1,
                              "Touch of Frost (1pt)": 1, "Cursed (1pt)": 1, "Cursed (2pt)": 2, "Cursed (3pt)": 3,
                              "Cursed (4pt)": 4, "Cursed (5pt)": 5, "Beacon of the Unholy (2pt)": 2, "Deathsight (2pt)": 2,
                              "Eerie Presence (2pt)": 2, "Lord of the Flies (2pt)": 2, "Can't Cross Running Water (3pt)": 3, "Haunted (3pt)": 3,
                              "Repelled by Crosses (3pt)": 3, "Grip of the Damned (4pt)": 4, "Dark Fate (5pt)": 5, "Light-Sensitive (5pt)": 5};

 this.selectedPhysicalMerits = {0: new MeritFlaw("", 0)};
 this.selectedPhysicalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedMentalMerits = {0: new MeritFlaw("", 0)};
 this.selectedMentalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSocialMerits = {0: new MeritFlaw("", 0)};
 this.selectedSocialFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSupernaturalMerits = {0: new MeritFlaw("", 0)};
 this.selectedSupernaturalFlaws = {0: new MeritFlaw("", 0)};

this.chooseMeritFlaw = chooseMeritFlaw;
 function chooseMeritFlaw(prevMeritFlaw, meritFlaw, index, category){
   if(meritFlaw.name != ""){
     if(category.includes("Flaw"))
        this.flawCount++;
     else
        this.meritCount++;
      }
   else{
     if(category.includes("Flaw")){
        this.flawCount--;

      }
     else{
        this.meritCount--;
      }
   }
   switch(category){
      case "physicalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.physicalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedPhysicalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedPhysicalMerits).length; i++){
            if(this.selectedPhysicalMerits[i].name == meritFlaw.name && i != index){
              this.selectedPhysicalMerits[index].name = "";
              this.selectedPhysicalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "physicalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.physicalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if((this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost) <= this.maxFlawPts){
          this.selectedPhysicalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedPhysicalFlaws).length; i++){
            if(this.selectedPhysicalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedPhysicalFlaws[index].name = "";
              this.selectedPhysicalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedPhysicalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "mentalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.mentalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedMentalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedMentalMerits).length; i++){
            if(this.selectedMentalMerits[i].name == meritFlaw.name && i != index){
              this.selectedMentalMerits[index].name = "";
              this.selectedMentalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "mentalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.mentalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedMentalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedMentalFlaws).length; i++){
            if(this.selectedMentalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedMentalFlaws[index].name = "";
              this.selectedMentalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedMentalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "socialMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.socialMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSocialMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSocialMerits).length; i++){
            if(this.selectedSocialMerits[i].name == meritFlaw.name && i != index){
              this.selectedSocialMerits[index].name = "";
              this.selectedSocialMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "socialFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.socialFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if((this.addedFlawPts + meritFlaw.pointCost -prevMeritFlaw.pointCost) <= this.maxFlawPts){
          this.selectedSocialFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSocialFlaws).length; i++){
            if(this.selectedSocialFlaws[i].name == meritFlaw.name && i != index){
              this.selectedSocialFlaws[index].name = "";
              this.selectedSocialFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedSocialFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     case "supernaturalMerit":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.supernaturalMeritList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(prevMeritFlaw.pointCost);
        if(CharCreatorService.getFreebiePts() > 0){
          this.selectedSupernaturalMerits[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSupernaturalMerits).length; i++){
            if(this.selectedSupernaturalMerits[i].name == meritFlaw.name && i != index){
              this.selectedSupernaturalMerits[index].name = "";
              this.selectedSupernaturalMerits[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(-meritFlaw.pointCost);
        }
        break;
     case "supernaturalFlaw":
        meritFlaw = new MeritFlaw(meritFlaw.name, this.supernaturalFlawList[meritFlaw.name]);
        CharCreatorService.changeFreebiePts(-prevMeritFlaw.pointCost, true);
        if(this.addedFlawPts + meritFlaw.pointCost <= this.maxFlawPts){
          this.selectedSupernaturalFlaws[index] = meritFlaw;
          for(var i = 0; i < Object.values(this.selectedSupernaturalFlaws).length; i++){
            if(this.selectedSupernaturalFlaws[i].name == meritFlaw.name && i != index){
              this.selectedSupernaturalFlaws[index].name = "";
              this.selectedSupernaturalFlaws[index].pointCost = 0;
              return;
            }
          }
          CharCreatorService.changeFreebiePts(meritFlaw.pointCost, true);
          this.addedFlawPts = (this.addedFlawPts + meritFlaw.pointCost - prevMeritFlaw.pointCost);
        }
        else{
          this.selectedSupernaturalFlaws[index] = prevMeritFlaw;
          this.addedFlawPts = (this.addedFlawPts - prevMeritFlaw.pointCost);
        }
        break;
     default:
        break;
   }
 }

 this.addMeritFlaw = addMeritFlaw;
 function addMeritFlaw(category, name, pointCost, index){
   if(pointCost == undefined){
     name = "";
     pointCost = 0;
   };
   switch(category){
     case "physicalMerit":
        if(!index)
          index = Object.keys(this.selectedPhysicalMerits).length;
        if(name != "")
          this.meritCount++;
        this.selectedPhysicalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "physicalFlaw":
        if(!index)
          index = Object.keys(this.selectedPhysicalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedPhysicalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "mentalMerit":
        if(!index)
          var index = Object.keys(this.selectedMentalMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedMentalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "mentalFlaw":
        if(!index)
          var index = Object.keys(this.selectedMentalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedMentalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "socialMerit":
        if(!index)
          var index = Object.keys(this.selectedSocialMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedSocialMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "socialFlaw":
        if(!index)
          var index = Object.keys(this.selectedSocialFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedSocialFlaws[index] = new MeritFlaw(name, pointCost);
        break;
     case "supernaturalMerit":
        if(!index)
          var index = Object.keys(this.selectedSupernaturalMerits).length;
          if(name != "")
            this.meritCount++;
        this.selectedSupernaturalMerits[index] = new MeritFlaw(name, pointCost);
        break;
     case "supernaturalFlaw":
        if(!index)
          var index = Object.keys(this.selectedSupernaturalFlaws).length;
          if(name != "")
            this.flawCount++;
        this.selectedSupernaturalFlaws[index] = new MeritFlaw(name, pointCost);
        break;
   }
 }

 this.removeMeritFlaw = removeMeritFlaw;
 function removeMeritFlaw(index, category){
   switch(category){
   case "physicalMerit":
      CharCreatorService.changeFreebiePts(this.selectedPhysicalMerits[index].pointCost);
      delete this.selectedPhysicalMerits[index];
      this.meritCount--;
      break;
   case "physicalFlaw":
      CharCreatorService.changeFreebiePts(-this.selectedPhysicalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedPhysicalFlaws[index].pointCost;
      delete this.selectedPhysicalFlaws[index];
      this.flawCount--;
      break;
   case "mentalMerit":
      CharCreatorService.changeFreebiePts(this.selectedMentalMerits[index].pointCost);
      delete this.selectedMentalMerits[index];
      this.meritCount--;
      break;
   case "mentalFlaw":
      CharCreatorService.changeFreebiePts(-this.selectedMentalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedMentalFlaws[index].pointCost;
      delete this.selectedMentalFlaws[index];
      this.flawCount--;
      break;
   case "socialMerit":
      CharCreatorService.changeFreebiePts(this.selectedSocialMerits[index].pointCost);
      delete this.selectedSocialMerits[index];
      this.meritCount--;
      break;
   case "socialFlaw":
      CharCreatorService.changeFreebiePts(-this.selectedSocialFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedSocialFlaws[index].pointCost;
      delete this.selectedSocialFlaws[index];
      this.flawCount--;
      break;
   case "supernaturalMerit":
      CharCreatorService.changeFreebiePts(this.selectedSupernaturalMerits[index].pointCost);
      delete this.selectedSupernaturalMerits[index];
      this.meritCount--;
      break;
   case "supernaturalFlaw":
      CharCreatorService.changeFreebiePts(-this.selectedSupernaturalFlaws[index].pointCost);
      this.addedFlawPts -= this.selectedSupernaturalFlaws[index].pointCost;
      delete this.selectedSupernaturalFlaws[index];
      this.flawCount--;
      break;
   default:
      break;
    }
 }

 this.createMasterLists = createMasterLists;
 function createMasterLists(){
   this.masterMeritList = [];
   this.masterFlawList = [];
   var meritFlawList = [this.selectedPhysicalMerits, this.selectedPhysicalFlaws,
                        this.selectedMentalMerits, this.selectedMentalFlaws,
                        this.selectedSocialMerits, this.selectedSocialFlaws,
                        this.selectedSupernaturalMerits, this.selectedSupernaturalFlaws];

   for(var i = 0; i < meritFlawList.length; i++){
     for(var j = 0; j < Object.values(meritFlawList[i]).length; j++){
       if(meritFlawList[i][j].name == "")
        continue;
       var meritFlawName = meritFlawList[i][j].name.substr(0, meritFlawList[i][j].name.lastIndexOf(' '));
       var meritFlaw = new MeritFlaw(meritFlawName, meritFlawList[i][j].pointCost);
       if((i%2))
         this.masterFlawList.push(meritFlaw);
        else
         this.masterMeritList.push(meritFlaw);
     }
   }
 }

}]);
