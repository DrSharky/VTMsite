var app = angular.module("site");

app.service("LoadService",
['CharCreatorService', 'AttributeService', 'AbilitiesService', 'LoginService', '$rootScope',
  function(CharCreatorService, AttributeService, AbilitiesService, LoginService, $rootScope){

  var self = this;
  this.loadClick = loadClick;
  function loadClick(characterName){
    var uid = LoginService.getUID();
    var path = '/characters/' + uid + '/' + characterName;
    var character = firebase.database().ref(path);
    character.once('value', function(snapshot){
      if(snapshot.val()!=null){
        // self.loadCharInfo(snapshot.val());
        self.loadCharacter(snapshot.val());
      }
    });
  }

   this.loadAttribute = loadAttribute;
   function loadAttribute(attribute){
     AttributeService[attribute.name.toLowerCase()].points = attribute.points;
     AttributeService[attribute.name.toLowerCase()].pointCount = attribute.pointCount;
   }

   this.loadAbility = loadAbility;
   function loadAbility(ability){
     AbilitiesService[ability.name.toLowerCase().replace(" ", "")].points = ability.points;
     AbilitiesService[ability.name.toLowerCase().replace(" ", "")].pointCount = ability.pointCount;
   }

   this.loadCharacter = loadCharacter;
   function loadCharacter(character){
     this.mapCharInfo(character);
     this.mapAttributes(character);
     this.mapAbilities(character);
     $rootScope.$broadcast('loadCharacter', CharCreatorService);
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
       this.loadAbility(character.abilities[ability]);
     }
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
  };
}]);
