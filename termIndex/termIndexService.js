var app = angular.module("termIndex", []);
app.service('TermIndexService', ['$http', function($http){

  this.selectedTerm = null;
  this.termDefinition = null;
  this.termList = null;

  var service = this;
  $http.get('./termIndex/listOfTerms.txt').then(function(response){
    service.termList = response.data;
  });

  this.setTerm = function(term){
    this.selectedTerm = term;
    this.setDefinition(term);
  }

  this.getTerm = function(){
    return this.selectedTerm;
  }

   this.setDefinition = function(){
     this.termDefinition = this.termList[this.selectedTerm];
   }

   this.getDefinition = function(){
     return this.termDefinition;
   }

   this.clearTerm = function(){
     this.selectedTerm = null;
   }
}]);
