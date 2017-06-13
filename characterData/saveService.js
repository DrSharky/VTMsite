var app = angular.module("site");

app.service("SaveService",
 ['CharCreatorService', 'LoginService', 'AttributeService', 'AbilitiesService',
  'BackgroundsService', 'ClanService', 'DisciplineService', 'VirtuesService', 'WillpowerService', '$rootScope',
  function(CharCreatorService, LoginService, AttributeService, AbilitiesService,
    BackgroundsService, ClanService, DisciplineService, VirtuesService, WillpowerService, $rootScope){

    this.saveName;

    this.pushCharData = pushCharData;
    function pushCharData(path){
      var attributes = {};
      var abilities = {};
      var disciplines = {};
      angular.copy(AbilitiesService.abilitiesList, abilities);
      angular.copy(AttributeService.attributesList, attributes);


      for(var attribute in attributes){
        this.removeFunctions(attributes[attribute]);
      }
      for(var ability in abilities){
        this.removeFunctions(abilities[ability]);
      }

      var charData = {
        player: CharCreatorService.charPlayer,
        chronicle: CharCreatorService.charChronicle,
        name: CharCreatorService.charName,
        concept: CharCreatorService.charConcept,
        nature: CharCreatorService.charNature,
        demeanor: CharCreatorService.charDemeanor,
        generation: CharCreatorService.charGeneration,
        sire: CharCreatorService.charSire,
        attributes: attributes,
        abilities: abilities,
        clan: ClanService.selectedClan.name
      };

      var updates = {};
      updates[path] = charData;
      return firebase.database().ref().update(updates);
    }

    this.removeHashKeys = removeHashKeys;
    function removeHashKeys(ability){
      for(var i = 0; i<ability.points.length; i++){
        delete ability.points[i].$$hashKey;
      }
    }

    this.removeFunctions = removeFunctions;
    function removeFunctions(ability){
      delete ability.reset;
      delete ability.select;
      delete ability.zero;
    }

    var self = this;
    this.saveCharacter = saveCharacter;
    function saveCharacter(){
      var uid = LoginService.getUID();
      this.saveName = prompt("Enter save name: ", this.saveName);
      if(this.saveName!=null){
        if(this.saveName == ""){
          alert("Please enter a valid save name.");
          return null;
        }
        var path = '/characters/' + uid + '/' + this.saveName;
        var existingChar = firebase.database().ref(path);
        existingChar.once('value', function(snapshot){
          if(snapshot.val()!=null){
            if(confirm("Character exists. Overwrite?")){
              self.pushCharData(path);
            }
            else{
              return null;
            }
          }
          else{
            self.pushCharData(path);
          }
        })
      }
      else{
        return null;
      }
    }

    this.loadCharInfo = loadCharInfo;
    function loadCharInfo(character){
      CharCreatorService.charPlayer = character.player;
      CharCreatorService.charChronicle = character.chronicle;
      CharCreatorService.charName = character.name;
      CharCreatorService.charConcept = character.concept;
      CharCreatorService.charNature = character.nature;
      CharCreatorService.charDemeanor = character.demeanor;
      CharCreatorService.charSire = character.sire;
      CharCreatorService.charGeneration = character.generation;
    };

    var vm = this;
    this.loadCharacter = loadCharacter;
    function loadCharacter(characterName){
      var uid = LoginService.getUID();
      var path = '/characters/' + uid + '/' + characterName;
      var character = firebase.database().ref(path);
      character.once('value', function(snapshot){
        if(snapshot.val()!=null){
          vm.loadCharInfo(snapshot.val());
      }
      });
    }

}]);
