var app = angular.module("site");

app.controller("AttributesController",
 ['$scope', 'NgTableParams', 'UglyService', 'AttributeService', 'charFactory', '$timeout',
 function($scope, NgTableParams, UglyService, AttributeService, charFactory, $timeout){

  this.priorityChange = priorityChange;
  this.selectAttribute = selectAttribute;
  this.getPriorityPts = getPriorityPts;
  this.isUglyClan = isUglyClan;

  $timeout(charFactory.getDataStream, 2000);

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

  function priorityChange(changedPriority, id, prevPriority){
    AttributeService.priorityChange(changedPriority, id, prevPriority);
  };

}]);
