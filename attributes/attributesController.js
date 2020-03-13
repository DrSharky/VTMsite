var app = angular.module("site");

app.controller("AttributesController",
 ['NgTableParams', 'UglyService', 'AttributesService', '$scope',
 function(NgTableParams, UglyService, AttributeService, $scope){

  $scope.$on('$routeChangeSuccess', initScope);

  function initScope(){
    if(!AttributeService.loadedCharacter){
      AttributeService.resetAttributes();
      AttributeService.resetPriorities();
    }
  }

  this.freeMode = location.hash.includes("free");
  this.freeAttribute = freeAttribute;

  this.priorityChange = priorityChange;
  this.selectAttribute = selectAttribute;
  this.getPriorityPts = getPriorityPts;
  this.isUglyClan = isUglyClan;

  this.attributePriorities = getAttributePriorities();
  function getAttributePriorities(){
    return AttributeService.attributePriorities;
  };

  this.attributesPage = getAttributePage();
  function getAttributePage(){
    return AttributeService.attributesPage;
  };

  //Not being used, might be used later though.
  this.attributePtsTotal = getAttributePtsTotal();
  function getAttributePtsTotal(){
    return AttributeService.attributePtsTotal;
  };

  this.selectedPriorities = getSelectedPriorities();
  function getSelectedPriorities(){
    return AttributeService.selectedPriorities;
  };

  this.strength = getStrength();
  function getStrength(){
    return AttributeService.strength;
  };

  this.dexterity = getDexterity();
  function getDexterity(){
    return AttributeService.dexterity;
  };

  this.stamina = getStamina();
  function getStamina(){
    return AttributeService.stamina;
  };

  this.charisma = getCharisma();
  function getCharisma(){
    return AttributeService.charisma;
  };

  this.manipulation = getManipulation();
  function getManipulation(){
    return AttributeService.manipulation;
  };

  this.appearance = getAppearance();
  function getAppearance(){
    return AttributeService.appearance;
  };

  this.perception = getPerception();
  function getPerception(){
    return AttributeService.perception;
  };

  this.intelligence = getIntelligence();
  function getIntelligence(){
    return AttributeService.intelligence;
  };

  this.wits = getWits();
  function getWits(){
    return AttributeService.wits;
  };

  this.attributeCategories = getAttributeCategories();
  function getAttributeCategories(){
    return AttributeService.attributeCategories;
  };

  function isUglyClan(){
    return AttributeService.isUglyClan();
  };

  function getPriorityPts(index){
    return AttributeService.getPriorityPts(index);
  };

  function selectAttribute(attribute, index){
    AttributeService.selectAttribute(attribute, index);
  };

  function freeAttribute(attribute, index){
    AttributeService.freeAttribute(attribute, index);
  };

  function priorityChange(changedPriority, id, prevPriority){
    AttributeService.priorityChange(changedPriority, id, prevPriority);
  };

  var self = this;
  $scope.$on('loadCharacter', function(){
    AttributeService.loadedCharacter = true;
    self.selectedPriorities = getSelectedPriorities();
    self.strength = AttributeService.strength;
    self.dexterity = AttributeService.dexterity;
    self.stamina = AttributeService.stamina;
    self.charisma = AttributeService.charisma;
    self.manipulation = AttributeService.manipulation;
    self.appearance = AttributeService.appearance;
    self.perception = AttributeService.perception;
    self.intelligence = AttributeService.intelligence;
    self.wits = AttributeService.wits;
    $scope.$apply();
  });

  $scope.$on('resetCharacter', function(){
    AttributeService.loadedCharacter = false;
    AttributeService.resetAttributes();
    AttributeService.resetPriorities();
  })

}]);


app.config(["$translateProvider", function($translateProvider){
  $translateProvider.translations('en', {
    'Attributes': 'Attributes',
    'Physical': 'Physical',
    'Social': 'Social',
    'Mental': 'Mental',
    'Strength': 'Strength'
  });
  $translateProvider.translations('es', {
    'Attributes': 'Atributos',
    'Physical': 'Físicos',
    'Social': 'Sociales',
    'Mental': 'Mentales',
    'Strength': 'Fuerza'
  })
  .preferredLanguage('es');
}]);
