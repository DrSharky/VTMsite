var app = angular.module("site");

app.controller("AttributesController", function($window, $http){

  this.categoryChange = categoryChange;

  this.attributePtsTotal = 15;
  this.attributePriorities = ["Primary", "Secondary", "Tertiary"];

  this.primaryPts = 7;
  this.secondaryPts = 5;
  this.tertiaryPts = 3;

  this.selectedCategories =[{id:"physical", priority: null},
                            {id:"social", priority: null},
                            {id:"mental", priority: null}];

  this.physicalPriority = null;
  this.socialPriority = null;
  this.mentalPriority = null;

//TODO: Under construction. Figure out how to organize this correctly & check for equality between selectors.
function categoryChange(changedCategory){
  this.selectedCategories.forEach(function(category){
    if(changedCategory.priority == category.priority && changedCategory.id != category.id){
      var test = 1;
    }
  })
}

});
