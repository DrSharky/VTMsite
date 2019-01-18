var app = angular.module("site");

app.service("LoadService",
['CharCreatorService', 'AttributesService', 'AbilitiesService', 'ClanService', 'BackgroundsService', 'LoginService',
 'DisciplineService', 'VirtuesService', 'PathService', 'WillpowerService', 'MeritFlawService', 'SaveService', '$rootScope',
  function(CharCreatorService, AttributeService, AbilitiesService, ClanService, BackgroundsService, LoginService,
           DisciplineService, VirtuesService, PathService, WillpowerService, MeritFlawService, SaveService, $rootScope){

  this.userCharacters = {};

  var self = this;
  this.loadClick = loadClick;
  function loadClick(characterName){
    var uid = LoginService.getUID();
    var path = '/characters/' + uid + '/' + characterName;
    var character = firebase.database().ref(path);
    character.once('value', function(snapshot){
      if(snapshot.val()!=null){
        self.loadCharacter(snapshot.val(), characterName);
      }
    });
  }

  var self = this;
  this.removeCharData = removeCharData;
  function removeCharData(characterName){
    var uid = LoginService.getUID();
    var path = '/characters/' + uid + '/' + characterName;
    var namePath = '/characterNames/' + uid + '/' + characterName;
    var character = firebase.database().ref(path);
    character.once('value', function(snapshot){
      if(snapshot.val() != null){
        if(confirm("Are you sure you wish to delete this character?: " + characterName)){
          firebase.database().ref(path).remove();
          firebase.database().ref(namePath).remove();
        }
      }
    })
  }


  this.resetCharacter = resetCharacter;
  function resetCharacter(){
    $rootScope.$broadcast('resetCharacter', CharCreatorService);
  }

  this.loadChars = loadChars;
  function loadChars(){
    var uid = LoginService.getUID();
    var path = '/characterNames/' + uid;
    var user = firebase.database().ref(path);
    user.once('value', function(snapshot){
      if(snapshot.val()!=null){
        for(var character in snapshot.val()){
          self.userCharacters[character] = snapshot.val()[character];
        }
      }
    })
  }

   this.loadAttribute = loadAttribute;
   function loadAttribute(attribute){
     AttributeService[attribute.name.toLowerCase()].points = attribute.points;
     AttributeService[attribute.name.toLowerCase()].pointCount = attribute.pointCount;
   }

   this.loadAbility = loadAbility;
   function loadAbility(ability, abName){
     AbilitiesService[abName].points = ability.points;
     AbilitiesService[abName].pointCount = ability.pointCount;
     if(abName.startsWith("custom")){
       AbilitiesService[abName].name = ability.name;
       AbilitiesService[abName].id = abName;
     }
   }

   this.loadDiscipline = loadDiscipline;
   function loadDiscipline(discipline){
     DisciplineService.addDiscipline(discipline.name, discipline.pointCount, discipline.points);
   }

   this.loadBackground = loadBackground;
   function loadBackground(background){
     BackgroundsService.addBackground(background.name, background.pointCount, background.points);
   }

   this.loadVirtue = loadVirtue;
   function loadVirtue(virtue){
      VirtuesService.virtueList[virtue.name].points = virtue.points;
      VirtuesService.virtueList[virtue.name].pointCount = virtue.pointCount;
   }

   this.loadMeritFlaw = loadMeritFlaw;
   function loadMeritFlaw(meritFlaw, category, index){
     MeritFlawService.addMeritFlaw(category, meritFlaw.name, meritFlaw.pointCost, index);
   }

   this.loadCharacter = loadCharacter;
   function loadCharacter(character, charName){
     this.mapCharInfo(character);
     this.mapAttributes(character);
     this.mapAbilities(character);
     this.mapDisciplines(character);
     this.mapBackgrounds(character);
     this.mapVirtues(character);
     this.mapPath(character);
     this.mapWillpower(character);
     this.mapMeritsFlaws(character);
     SaveService.saveName = charName;
     $rootScope.$broadcast('loadCharacter', CharCreatorService);
   }

   this.mapMeritsFlaws = mapMeritsFlaws;
   function mapMeritsFlaws(character){
     MeritFlawService.addedFlawPts = character.addedFlawPts;
     for(var physicalMerit in character.physicalMerits){
       this.loadMeritFlaw(character.physicalMerits[physicalMerit], 'physicalMerit', physicalMerit);
     }
     for(var physicalFlaw in character.physicalFlaws){
       this.loadMeritFlaw(character.physicalFlaws[physicalFlaw], 'physicalFlaw', physicalFlaw);
     }
     for(var mentalMerit in character.mentalMerits){
       this.loadMeritFlaw(character.mentalMerits[mentalMerit], 'mentalMerit', mentalMerit);
     }
     for(var mentalFlaw in character.mentalFlaws){
       this.loadMeritFlaw(character.mentalFlaws[mentalFlaw], 'mentalFlaw', mentalFlaw);
     }
     for(var socialMerit in character.socialMerits){
       this.loadMeritFlaw(character.socialMerits[socialMerit], 'socialMerit', socialMerit);
     }
     for(var socialFlaw in character.socialFlaws){
       this.loadMeritFlaw(character.socialFlaws[socialFlaw], 'socialFlaw', socialFlaw);
     }
     for(var supernaturalMerit in character.supernaturalMerits){
       this.loadMeritFlaw(character.supernaturalMerits[supernaturalMerit], 'supernaturalMerit', supernaturalMerit);
     }
     for(var supernaturalFlaw in character.supernaturalFlaws){
       this.loadMeritFlaw(character.supernaturalFlaws[supernaturalFlaw], 'supernaturalFlaw', supernaturalFlaw);
     }
   }

   this.mapAttributes = mapAttributes;
   function mapAttributes(character){
     AttributeService.primaryPts = character.attributePrimary;
     AttributeService.secondaryPts = character.attributeSecondary;
     AttributeService.tertiaryPts = character.attributeTertiary;
     AttributeService.selectedPriorities = character.attributePriorities;
     for(var attribute in character.attributes){
       this.loadAttribute(character.attributes[attribute]);
     }
   }

   this.mapAbilities = mapAbilities;
   function mapAbilities(character){
     AbilitiesService.primaryPts = character.abilityPrimary;
     AbilitiesService.secondaryPts = character.abilitySecondary;
     AbilitiesService.tertiaryPts = character.abilityTertiary;
     AbilitiesService.selectedPriorities = character.abilityPriorities;
     for(var ability in character.abilities){
       this.loadAbility(character.abilities[ability], ability);
     }
   }

   this.mapDisciplines = mapDisciplines;
   function mapDisciplines(character){
     DisciplineService.disciplinePts = character.disciplinePts;
     for(var discipline in DisciplineService.selectedClanDisciplines){
       delete DisciplineService.selectedClanDisciplines[discipline];
     }
     for(var discipline in character.disciplines){
       this.loadDiscipline(character.disciplines[discipline]);
     }
   }

   this.mapBackgrounds = mapBackgrounds;
   function mapBackgrounds(character){
     BackgroundsService.backgroundPts = character.backgroundPts;
     for(var background in BackgroundsService.selectedList){
       delete BackgroundsService.selectedList[background];
     }
     for(var background in character.backgrounds){
       this.loadBackground(character.backgrounds[background]);
     }
   }

   this.mapVirtues = mapVirtues;
   function mapVirtues(character){
      VirtuesService.virtuePts = character.virtuePts;
     for(var virtue in character.virtues){
       this.loadVirtue(character.virtues[virtue]);
     }
   }

   this.mapPath = mapPath;
   function mapPath(character){
     PathService.selectedPath.name = character.path.name;
     PathService.selectedPath.pointCount = character.path.pointCount;
     PathService.selectedPath.pointMin = character.path.pointMin;
     PathService.selectedPath.points = character.path.points;
   }

   this.mapWillpower = mapWillpower;
   function mapWillpower(character){
     WillpowerService.willpower.pointCount = character.willpower.pointCount;
     WillpowerService.willpower.pointMin = character.willpower.pointMin;
     WillpowerService.willpower.points = character.willpower.points;
   }

  this.mapCharInfo = mapCharInfo;
  function mapCharInfo(character){
    CharCreatorService.charPlayer = character.player;
    CharCreatorService.charChronicle = character.chronicle;
    CharCreatorService.charName = character.name;
    CharCreatorService.charConcept = character.concept;
    CharCreatorService.charNature = character.nature;
    CharCreatorService.charDemeanor = character.demeanor;
    CharCreatorService.charSire = character.sire;
    CharCreatorService.charGeneration = character.generation;
    CharCreatorService.freebiePts = character.freebiePts;
    CharCreatorService.freebieSpent = character.freebieSpent;
    if(character.freebieSpent == null) //Error checking that freebieSpent update.
      CharCreatorService.freebieSpent = ((15 + character.addedFlawPts) - character.freebiePts);
    CharCreatorService.freebieMode = character.freebieMode;
    var clanIndex = ClanService.clanList.map(function(clan){
      return clan.name;
    }).indexOf(character.clan);
    ClanService.selectedClan = ClanService.clanList[clanIndex];
  };
}]);
