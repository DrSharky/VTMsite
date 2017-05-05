var app = angular.module("termIndex");

app.controller("TermIndexController",
 ['$scope', '$http', 'TermIndexService',
 function($scope, $http, TermIndexService){
  this.termIndexPage = "./termIndex/termIndex.html"

  this.termNull = function(){
    return (TermIndexService.selectedTerm === null);
  }
  this.clearTerm = function(){
    TermIndexService.clearTerm();
  }

  this.getTerm = function(){
    return TermIndexService.selectedTerm;
  };

  this.getDefinition = function(){
    return TermIndexService.termDefinition;
  };

  this.setTerm = function(term){
    this.selectedTerm = TermIndexService.setTerm(term);
    this.setDefinition();
  }

  this.setDefinition = function(){
    this.termDefinition = TermIndexService.setDefinition(this.selectedTerm);
  }

}]);
