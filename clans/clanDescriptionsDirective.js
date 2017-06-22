var app = angular.module("site");

app.directive('clandescription',
 ['TermIndexService', 'clanDescriptionsFactory', '$compile',
 function(TermIndexService, clanDescriptionsFactory, $compile) {
    var getTemplate = function(clan) {
      return clanDescriptionsFactory[clan];
    }
    return {
      restrict: 'E',
      controller: 'ClanController',
      controllerAs: 'clanCtrl',
      scope: {
        clan: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch('clan', function() {
          element.html(getTemplate(scope.clan)).show();
          $compile(element.contents())(scope);
        })
      }
    }
  }]);
