angular.module("site").service('TermIndexService', function($http){

  this.selectedTerm = null;
  this.termDefinition = null;
  this.termList = null;

  this.setTerm = function(term){
    this.selectedTerm = term;
    return this.selectedTerm;
  }

  this.getTerm = function(){
    return this.selectedTerm;
  }

   var service = this;
   $http.get('termIndex/listOfTerms.txt').then(function(response){
     service.termList = response.data;
   });

   this.setDefinition = function(){
     this.termDefinition = this.termList[this.selectedTerm];
   }

   this.getDefinition = function(){
     return this.termDefinition;
   }

   this.clearTerm = function(){
     this.selectedTerm = null;
   }
});
