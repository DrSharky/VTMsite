var app = angular.module("site");

app.service("SaveService",
 ['CharCreatorService', 'LoginService', 'AttributesService', 'AbilitiesService', 'BackgroundsService', 'ClanService',
  'DisciplineService', 'VirtuesService', 'PathService', 'WillpowerService', 'MeritFlawService', '$rootScope',
  function(CharCreatorService, LoginService, AttributeService, AbilitiesService, BackgroundsService, ClanService,
           DisciplineService, VirtuesService, PathService, WillpowerService, MeritFlawService, $rootScope){

    this.saveName;

    this.uid = LoginService.getUID();

    this.pushCharData = pushCharData;
    function pushCharData(savePath){
      var attributes = {};
      var abilities = {};
      var disciplines = {};
      var backgrounds = {};
      var virtues = {};
      var path = {};
      var willpower = {};
      var physicalMerits = {};
      var physicalFlaws = {};
      var mentalMerits = {};
      var mentalFlaws = {};
      var socialMerits = {};
      var socialFlaws = {};
      var supernaturalMerits = {};
      var supernaturalFlaws = {};
      angular.copy(AbilitiesService.abilitiesList, abilities);
      angular.copy(AttributeService.attributesList, attributes);
      angular.copy(DisciplineService.selectedClanDisciplines, disciplines);
      angular.copy(BackgroundsService.selectedList, backgrounds);
      angular.copy(VirtuesService.virtueList, virtues);
      angular.copy(PathService.selectedPath, path);
      angular.copy(WillpowerService.willpower, willpower);
      angular.copy(MeritFlawService.selectedPhysicalMerits, physicalMerits);
      angular.copy(MeritFlawService.selectedPhysicalFlaws, physicalFlaws);
      angular.copy(MeritFlawService.selectedMentalMerits, mentalMerits);
      angular.copy(MeritFlawService.selectedMentalFlaws, mentalFlaws);
      angular.copy(MeritFlawService.selectedSocialMerits, socialMerits);
      angular.copy(MeritFlawService.selectedSocialFlaws, socialFlaws);
      angular.copy(MeritFlawService.selectedSupernaturalMerits, supernaturalMerits);
      angular.copy(MeritFlawService.selectedSupernaturalFlaws, supernaturalFlaws);

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
      this.removeFunctions(path);
      this.removeFunctions(willpower);

      var charData = {
        player: CharCreatorService.charPlayer,
        chronicle: CharCreatorService.charChronicle,
        name: CharCreatorService.charName,
        concept: CharCreatorService.charConcept,
        nature: CharCreatorService.charNature,
        demeanor: CharCreatorService.charDemeanor,
        generation: CharCreatorService.charGeneration,
        sire: CharCreatorService.charSire,
        freebiePts: CharCreatorService.freebiePts,
        freebieSpent: CharCreatorService.freebieSpent,
        freebieMode: CharCreatorService.freebieMode,
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
        virtuePts: VirtuesService.virtuePts,
        path: path,
        willpower: willpower,
        physicalMerits: physicalMerits,
        physicalFlaws: physicalFlaws,
        mentalMerits: mentalMerits,
        mentalFlaws: mentalFlaws,
        socialMerits: socialMerits,
        socialFlaws: socialFlaws,
        supernaturalMerits: supernaturalMerits,
        supernaturalFlaws: supernaturalFlaws,
        addedFlawPts: MeritFlawService.addedFlawPts
      };

      errorCheckPriorities(charData.abilityPriorities);
      errorCheckPriorities(charData.attributePriorities);

      var updates = {};
      updates[savePath] = charData;
      return firebase.database().ref().update(updates);
    }

    this.errorCheckPriorities = errorCheckPriorities;
    function errorCheckPriorities(priorityArray){
      for(var i = 0; i < priorityArray.length; i++){
        if(priorityArray[i]==null)
          priorityArray[i] = "";
      }
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

    this.saveCharacterName = saveCharacterName;
    function saveCharacterName(){
      var uid = LoginService.getUID();
    }

    this.pushCharName = pushCharName;
    function pushCharName(savePath){
      var updates = {};
      var data = {};
      data = {saveName: this.saveName};
      updates[savePath] = data;
      return firebase.database().ref().update(updates);
    }

    var self = this;
    this.saveCharacter = saveCharacter;
    function saveCharacter(){
      this.saveName = prompt("Enter save name: ", this.saveName);
      if(this.saveName!=null){
        if(this.saveName == ""){
          alert("Please enter a valid save name.");
          return null;
        }
        var pathCharName = '/characterNames/' + this.uid + '/' + this.saveName;
        var pathData = '/characters/' + this.uid + '/' + this.saveName;
        var existingCharName = firebase.database().ref(pathCharName);
        existingCharName.once('value', function(snapshot){
          if(snapshot.val()!=null){
            if(confirm("Character exists. Overwrite?")){
              self.pushCharName(pathCharName);
              self.pushCharData(pathData);
            }
            else{
              return null;
            }
          }
          else{
            self.pushCharName(pathCharName);
            self.pushCharData(pathData);
          }
        })
      }
      else{
        return null;
      }
    };
}]);
