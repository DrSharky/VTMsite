var app = angular.module("site");

app.controller("TermIndexController", function($scope, $http, TermIndexService){
  this.termIndexPage = "./termIndex.html"

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

});

app.directive('termindex', function(TermIndexService, $compile){

  return {
    restrict: 'AE',
    controller: "TermIndexController",
    controllerAs: "tindexCtrl",
    transclude: true,
    scope: {
      term: '@'
    },
    link: function(scope, element, attrs, ctrl){
      if(attrs.term == "Concept" || attrs.term == "Nature" || attrs.term == "Demeanor" ||
         attrs.term == "Chronicle" || attrs.term == "Sire"   || attrs.term == "Generation")
         {
          var htmlString = "<label ng-click='tindexCtrl.setTerm(term)' for='"+attrs.for+"'>"+attrs.term+": </label>";
          element.html(htmlString);
          $compile(element.contents())(scope);
         }
    },
    template: '<span ng-click="tindexCtrl.setTerm(term)"><ng-transclude></ng-transclude></span>'
  }
});
