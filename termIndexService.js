angular.module("site").service('TermIndexService', function($http){
  this.selectedTerm = null;
  this.termDefinition = null;


  var getTerms = function(){
    return $http.get('termIndex/listOfTerms.txt');
  };


  return {
    getTerms: getTerms
  };
});
