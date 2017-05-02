var app = angular.module("termIndex");

app.directive('termindex',
 ['TermIndexService', '$compile',
 function(TermIndexService, $compile){
  return {
    restrict: 'AE',
    controller: function($scope, TermIndexService){
      $scope.setTerm = function(term){
        TermIndexService.setTerm(term);
      }
      $scope.osiris = false;
      if($scope.term == "2 other disciplines learned from original clan"){
        $scope.osiris = true;
      }
    },
    transclude: true,
    scope: {
      term: '@'
    },
    template: '<span ng-if="!osiris" style="cursor:pointer;"'+
              ' ng-click="setTerm(term)">'+
              '<ng-transclude></ng-transclude>'+
              '</span>'+
              '<span ng-if="osiris">'+
              '<ng-transclude></ng-transclude>'+
              '</span>'
  }
}]);
