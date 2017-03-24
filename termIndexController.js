var app = angular.module("site");

app.controller("TermIndexController", function($scope, $http, TermIndexService){
  this.termIndexPage = "./termIndex.html"
  this.selectedTerm = null;
  this.termDefinition = null;
  this.termList = null;

  var vm = this;

  $http.get('termIndex/listOfTerms.txt').then(function(response){
    vm.termList = response.data;
  });

  
});
