var app = angular.module("site");
app.directive('disciplineHtml', ['$compile',
function($compile) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      scope.$watch(function() {
        return scope.$eval(attrs.disciplineHtml);
      }, function(value) {
        var htmlOutput = "";
        for (var i = 0; i < value.length; i++) {
          if (i != value.length - 1) {
            htmlOutput += "<termindex term='" + value[i] + "'>" + value[i] +
              "</termindex>,&nbsp;";
          } else {
            htmlOutput += "<termindex term='" + value[i] + "'>" + value[i] +
              "</termindex>";
          }
        }
        element.html(htmlOutput);
        $compile(element.contents())(scope);
      });
    }
  };
}]);
