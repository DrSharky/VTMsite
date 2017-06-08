var app = angular.module("site");

app.service("SaveService",
 ['CharCreatorService', 'LoginService', 'AttributeService', 'BackgroundsService',
  'ClanService', 'DisciplineService', 'VirtuesService', 'WillpowerService',
  function(CharCreatorService, LoginService, AttributeService, BackgroundsService,
           ClanService, DisciplineService, VirtuesService, WillpowerService){

    this.saveName;

    this.pushCharData = pushCharData;
    function pushCharData(path){
      var charData = {
        player: CharCreatorService.charPlayer,
        chronicle: CharCreatorService.charChronicle,
        name: CharCreatorService.charName,
        concept: CharCreatorService.charConcept,
        nature: CharCreatorService.charNature,
        demeanor: CharCreatorService.charDemeanor,
        generation: CharCreatorService.charGeneration,
        sire: CharCreatorService.charSire,
        attributes: {
          strength: AttributeService.strength,
          dexterity: AttributeService.dexterity,
          stamina: AttributeService.stamina,
          charisma: AttributeService.charisma,
          manipulation: AttributeService.manipulation,
          appearance: AttributeService.appearance,
          perception: AttributeService.perception,
          intelligence: AttributeService.intelligence,
          wits: AttributeService.wits
        },
        clan: ClanService.selectedClan
      };

      for(var ability in charData.attributes){
        this.removeHashKeys(charData.attributes[ability]);
        this.removeFunctions(charData.attributes[ability]);
        var test = 0;
      }


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

}]);
