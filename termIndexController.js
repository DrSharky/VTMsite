var app = angular.module("site");

app.controller("TermIndexController", function($scope, $http, TermIndexService){
  this.termIndexPage = "./termIndex.html"
  this.selectedTerm = null;
  this.termDefinition = null;
  this.termList = null;

  var ctrl = this;
  this.getTerms = function(){
    TermIndexService.getTerms().then(function(response){
      ctrl.termList = response.data;
    });
  };

  ctrl.getTerms();

});

app.directive('termindex', function ($compile, TermIndexService) {

  var getDescription = function(termDefinitions, term){
    term = termDefinitions[term];
    return term;
  }
    return {
        restrict: 'E',
        // template: '<span>kindred</span>',
        replace: true,
        scope: {
          content: '='
        },
        link: function(scope, element, attrs){
          TermIndexService.getTerms().then(function(response){
            var termDefinitions = response.data;

            element.html(getDescription(termDefinitions, scope.term));
            $compile(element.contents())(scope);
          });
        }
    };
});
