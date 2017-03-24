angular.module("site").service('TermIndexService', function(){
  this.selectedTerm = null;
  this.termDefinition = null;

  this.setSelectedTerm = setSelectedTerm;

  var vm = this;
  function setSelectedTerm(term){
    vm.selectedTerm = term;
  };
});
