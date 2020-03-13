var app = angular.module("site");

app.service("MeritFlawService", ['CharCreatorService',
 function(CharCreatorService){

   this.loadedCharacter = false;
   this.freeMode = location.hash.includes("free");
   this.maxFlawPts = this.freeMode ? 10000 : 7;
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
                         "Sabbat Survivor (1pt)": 1, "Boon (1pt)": 1, "Boon (2pt)": 2, "Boon (3pt)": 3,"Boon (4pt)": 4, "Boon (5pt)": 5,
                         "Boon (6pt)": 6, "Bullyboy (2pt)": 2, "Old Pal (2pt)": 2, "Lawman's Friend (2pt)": 2, "Open Road (2pt)": 2, "Sanctity (2pt)": 2,
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
                              "Eerie Presence (2pt)": 2, "Lord of the Flies (2pt)": 2, "Can't Cross Running Water (3pt)": 3,
                              "Haunted (3pt)": 3, "Repelled by Crosses (3pt)": 3, "Grip of the Damned (4pt)": 4, "Dark Fate (5pt)": 5,
                              "Light-Sensitive (5pt)": 5};

this.clansMeritList = {"": 0, "Sectarian Ally (1pt)": 1, "Thousand Meter Killer (1pt)": 1,
                              "Fury's Focus (3pt, Prerequisite: Path of Entelechy)": 3, "Dynamic Personality (5pt)": 5,
                              "Drug Resistance (2pt)": 2, "Addictive Blood (3pt)": 3,
                              "Setite Initiate (5pt)": 5, "Hive-Minded (1pt)": 1,
                              "Hive-Minded (2pt)": 2, "Skald (2pt)": 2, "Lesser Mark of the Beast (4pt)": 4,
                              "Totemic Change (5pt)": 5, "Cannibal (1pt)": 1, "Consanguineous Reistance (1pt)": 1,
                              "Mortuario (2pt)": 2, "Mortuario (4pt)": 4, "Sanguine Incongruity (5pt)": 5,
                              "Court Favorite (1pt)": 1, "Court Favorite (2pt)": 2, "Court Favorite (3pt)": 3,
                              "Court Favorite (4pt)": 4, "Court Favorite (5pt)": 5, "Eyes of Shadow (1pt)": 1,
                              "Eyes of Shadow (2pt)": 2, "Eyes of Shadow (3pt)": 3, "Eyes of Shadow (4pt)": 4,
                              "Bigger Boys Came (2pt)": 2, "Call of the Sea (2pt)": 2, "Controllable Night Sight (2pt)": 2,
                              "Secret Stash (2pt)": 2, "Secret Stash (3pt)": 3, "Secret Stash (4pt)": 4,
                              "Secret Stash (5pt)": 5, "Aura of Command (3pt)": 3, "King or Queen of Shadow (4pt)": 4,
                              "Long-Term Planning (4pt)": 4, "Instrument of God (5pt)": 5,  "Distracting Aura (2pt)": 2,
                              "Prophetic Dreams (2pt)": 2, "Cold Read (3pt)": 3, "Foul Blood (1pt)": 1,
                              "Lizard Limbs (1pt)": 1, "Long Fingers (1pt)": 1, "Monstrous Maw (1pt)": 1,
                              "Piscine (1pt)": 1, "Slimy (1pt)": 1, "Spawning Pool (1pt)": 1, "Spawning Pool (2pt)": 2,
                              "Spawning Pool (3pt)": 3, "Tunnel Rat (1pt)": 1, "Tunnel Rat (2pt)": 2, "Tunnel Rat (3pt)": 3,
                              "Tunnel Rat (4pt)": 4, "Tunnel Rat (5pt)": 5, "Sleep Unseen (1pt)": 1, "Tough Hide (2pt)": 2,
                              "False Reflection (3pt)": 3, "Patagia (4pt)": 4, "Rugged Bad Looks (5pt)": 5,
                              "Antitoxin Blood (1pt)": 1, "Brahmin (1pt)": 1, "Kshatriya (1pt)": 1, "Legerdemain (1pt)": 1,
                              "Mute Devotion (1pt)": 1, "Vaishya (1pt)": 1, "Critters (2pt)": 2, "Heart of Needles (3pt)": 3,
                              "Indelible (1pt)": 1, "Indelible (2pt)": 2, "Impressive Restraint (2pt)": 2,
                              "Master of the Masquerade (2pt)": 2, "Slowed Degeneration (5pt)": 5,
                              "Embraced without the Cup (1pt)": 1, "Secret Society Member (1pt)": 1, "Keys to the Library (1pt)": 1,
                              "Keys to the Library (2pt)": 2, "Keys to the Library (3pt)": 3, "Keys to the Library (4pt)": 4,
                              "Keys to the Library (5pt)": 5, "Unmarked Antitribu (2pt)": 2, "Unmarked Antitribu (5pt)": 5,
                              "Quartermaster (3pt)": 3, "Bioluminescence (1pt)": 1, "Pain Tolerance (2pt)": 2,
                              "Dracon's Temperament (3pt)": 3, "Haven Affinity (3pt)": 3, "Revenant Disciplines (3pt)": 3,
                              "Promethean Clay (5pt)": 5, "Connoisseur (2pt)": 2, "Blessed by St. Gustav (4pt)": 4};

this.clansFlawList = {"": 0, "Outcast (2pt)": 2, "Broken Antitribu (3pt)": 3, "Multiple Curses (3pt)": 3,
                             "Obvious Predator (2pt)": 2, "Scales (1pt)": 1, "Scales (2pt)": 2,
                             "Scales (3pt)": 3, "Venemous Bite (2pt)": 2, "Forked Tongue (2pt)": 2,
                             "Heartless (4pt)": 4, "Aura of the Typhon (5pt)": 5, "Member of the Pack (2pt)": 2,
                             "Rat in a Cage (2pt)": 2, "Inbred (1pt)": 1, "Inbred (2pt)": 2, "Inbred (3pt)": 3,
                             "Inbred (4pt)": 4, "Inbred (5pt)": 5, "Shadow Walker (6pt)": 6, "Uncontrollable Night Sight (2pt)": 2,
                             "Insubordinate (3pt)": 3, "Unproven (3pt)": 3, "Paper Trail (2pt)": 2, "Stigmata (2pt)": 2,
                             "Stigmata (4pt)": 4, "Infectious (3pt)": 3, "Overstimulated (3pt)": 3, "Dead Inside (4pt)": 4,
                             "Stench (1pt)": 1, "Dangerous Secret (1pt)": 1, "Dangerous Secret (2pt)": 2, "Dangerous Secret (3pt)": 3,
                             "Dangerous Secret (4pt)": 4, "Dangerous Secret (5pt)": 5, "Anosmia (2pt)": 2, "Parasitic Infestation (2pt)": 2,
                             "Bestial (3pt)": 3, "Enemy Brood (3pt)": 3, "Putrescent (4pt)": 4, "Contagious (5pt)": 5, "Incoherent (5pt)": 5,
                             "Chandala (1pt)": 1, "Flawed Reality (2pt)": 2, "Oathbreaker (2pt)": 2, "Lost Svadharma (3pt)": 3,
                             "Tortured Artist (1pt)": 1, "Private Life (3pt)": 3, "Arcane Curse (1pt)": 1, "Arcane Curse (2pt)": 2,
                             "Arcane Curse (3pt)": 3, "Arcane Curse (4pt)": 4, "Arcane Curse (5pt)": 5, "Cloistered (2pt)": 2,
                             "Betrayer's Mark (3pt)": 3, "Bound to the Clan (3pt)": 3, "Mage Blood (5pt)": 5, "Thaumaturgically Inept (5pt)": 5,
                             "Unblinking (1pt)": 1, "Ancestral Soil Dependence (2pt)": 2, "Faceless (3pt)": 3, "Privacy Obsession (3pt)": 3,
                             "Revenant Weakness (3pt)": 3, "Consumption (5pt)": 5, "Uncommon Vitae Preference (2pt)": 2};

this.bloodlinesMeritList = {"": 0, "The High Price (3pt)": 3, "Simply Waiting (4pt)": 4, "Chorus Trained (3pt)": 3,
                            "Chorus Trained (5pt)": 5, "Fugue Instinct (3pt)": 3, "Stillness of Death (2pt)": 2,
                            "Heavy Hands (3pt)": 3, "Disciple of Lazarus/Japheth (2pt)": 2, "Styx Baptism (3pt)": 3,
                            "Half-Life (6pt)": 6, "Prized Collection (1pt)": 1, "Prized Collection (2pt)": 2,
                            "Alien Perfection (2pt)": 2, "Paranormal Link (2pt)": 2, "Skin of Porcelain (4pt)": 4,
                            "Vitae Mutation (5pt)": 5, "Extra Sharp (2pt)": 2, "Speed Eater (2pt)": 2,
                            "Speed Eater (4pt)": 4, "Wolverine's Palate (3pt)": 3, "Scent of the Other (1pt)": 1,
                            "Sight Beyond Sight (3pt)": 3, "Warrior's Heart (3pt)": 3, "Death Grip (3pt)": 3,
                            "Stitcher (3pt)": 3, "Advanced Tech (1pt)": 1, "Advanced Tech (2pt)": 2,
                            "Advanced Tech (3pt)": 3, "Advanced Tech (4pt)": 4, "Advanced Tech (5pt)": 5,
                            "Fatalist (3pt)": 3, "True Celerity (5pt)": 5};

this.bloodlinesFlawList = {"": 0, "Carrion Presence (2pt)": 2, "Dark Aura (3pt)": 3, "Plague of Demons (4pt)": 4,
                           "Banshee-in-Waiting (5pt)": 5, "Stone Tongue (3pt)": 3, "Blood Weakness (4pt)": 4,
                           "Blood Weakness (7pt)": 7, "Unsanctioned Embrace (2pt)": 2, "Shadow Scarred (3pt)": 3,
                           "Lightweight (1pt)": 1, "Illiterate (1pt)": 1, "Illiterate (2pt)": 2, "Refined Palate (1pt)": 1,
                           "Refined Palate (2pt)": 2, "Refined Palate (3pt)": 3, "Dreadful Mara (4pt)": 4, "The Largest Maw (2pt)": 2,
                           "Body Trail (4pt)": 4, "The Eighth (6pt)": 6, "Permanent Third Eye (2pt)": 2,
                           "Permanent Third Eye (4pt)": 4, "Brittle Body (2pt)": 2, "Brittle Body (4pt)": 4,
                           "Mortal Flashbacks (5pt)": 5, "Out of Phase (2pt)": 2};

 this.selectedPhysicalMerits = {0: new MeritFlaw("", 0)};
 this.selectedPhysicalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedMentalMerits = {0: new MeritFlaw("", 0)};
 this.selectedMentalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSocialMerits = {0: new MeritFlaw("", 0)};
 this.selectedSocialFlaws = {0: new MeritFlaw("", 0)};

 this.selectedSupernaturalMerits = {0: new MeritFlaw("", 0)};
 this.selectedSupernaturalFlaws = {0: new MeritFlaw("", 0)};

 this.selectedClanMerits = {0: new MeritFlaw("", 0)};
 this.selectedClanFlaws = {0: new MeritFlaw("", 0)};

 this.selectedBloodlineMerits = {0: new MeritFlaw("", 0)};
 this.selectedBloodlineFlaw = {0: new MeritFlaw("", 0)};

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
      if(CharCreatorService.getFreebiePts() < this.selectedPhysicalFlaws[index].pointCost)
        break;
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
      if(CharCreatorService.getFreebiePts() < this.selectedMentalFlaws[index].pointCost)
        break;
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
      if(CharCreatorService.getFreebiePts() < this.selectedSocialFlaws[index].pointCost)
        break;
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
      if(CharCreatorService.getFreebiePts() < this.selectedSupernaturalFlaws[index].pointCost)
        break;
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

 this.resetMeritFlaws = resetMeritFlaws;
 function resetMeritFlaws(){

   this.meritCount = 0;
   this.flawCount = 0;
   this.addedFlawPts = 0;

   for(var i = 0; i < this.meritFlawList.length; i++){
     var objLength = Object.keys(this.meritFlawList[i]).length;

     if(objLength > 1){
       for(var j = 1; j <= objLength; j++){
         delete this.meritFlawList[i][j];
       }
     }
     this.meritFlawList[i][0] = new MeritFlaw("", 0);

   }
 }

 this.meritFlawList = [this.selectedPhysicalMerits, this.selectedPhysicalFlaws,
                       this.selectedMentalMerits, this.selectedMentalFlaws,
                       this.selectedSocialMerits, this.selectedSocialFlaws,
                       this.selectedSupernaturalMerits, this.selectedSupernaturalFlaws];

}]);
