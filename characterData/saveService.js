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
      var backgrounds = {};
      var virtues = {};
      angular.copy(AbilitiesService.abilitiesList, abilities);
      angular.copy(AttributeService.attributesList, attributes);
      angular.copy(DisciplineService.selectedClanDisciplines, disciplines);
      angular.copy(BackgroundsService.selectedList, backgrounds);
      angular.copy(VirtuesService.virtueList, virtues);

      for(var attribute in attributes){
        this.removeFunctions(attributes[attribute]);
      }
      for(var ability in abilities){
        this.removeFunctions(abilities[ability]);
      }
      for(var discipline in disciplines){
        this.removeFunctions(disciplines[discipline]);
      }
      for(var background in backgrounds){
        this.removeFunctions(backgrounds[background]);
      }
      for(var virtue in virtues){
        this.removeFunctions(virtues[virtue]);
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
        attributePriorities: AttributeService.selectedPriorities,
        attributePrimary: AttributeService.primaryPts,
        attributeSecondary: AttributeService.secondaryPts,
        attributeTertiary: AttributeService.tertiaryPts,
        abilityPriorities: AbilitiesService.selectedPriorities,
        abilityPrimary: AbilitiesService.primaryPts,
        abilitySecondary: AbilitiesService.secondaryPts,
        abilityTertiary: AbilitiesService.tertiaryPts,
        abilities: abilities,
        clan: ClanService.selectedClan.name,
        disciplines: disciplines,
        disciplinePts: DisciplineService.disciplinePts,
        backgrounds: backgrounds,
        backgroundPts: BackgroundsService.backgroundPts,
        virtues: virtues,
        virtuePts: VirtuesService.virtuePts
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
    function removeFunctions(content){
      delete content.reset;
      delete content.select;
      delete content.zero;
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
}]);
