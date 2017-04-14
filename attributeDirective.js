var app = angular.module("site");
app.directive('attrGrid', function(){
  return{
    restrict: 'E',
  }
});

app.directive('attrRow', function(){
  return{
    restrict: 'E',
    controller: 'AttributesController',
    controllerAs: 'attrCtrl',
    scope: {
      attributes: '='
    },
    link: function(scope, element, attrs, controller){

    },
    template: '<tr>'+
      '<td style="width:100px;">'+
        '<div termindex term="{{attributes[0].name}}" class="attrLabel">'+
          '{{attributes[0].name}}'+
        '</div>'+
      '</td>'+
      '<td class="points-cell" style="width:245px;">'+
        '<div ng-repeat="attrPt in attributes[0].points" style="display: inline-block;">'+
          '<img class="attrimg" ng-src="{{attrPt.img}}" ng-click="attrCtrl.selectAttribute(attributes[0], $index)"/>'+
        '</div>'+
      '</td>'+
    '<td style="width:100px;">'+
      '<div termindex term="{{attributes[1]}}" class="attrLabel">'+
        '{{attributes[1].name}}'+
      '</div>'+
    '</td>'+
    '<td class="points-cell" style="width:245px;">'+
      '<div ng-repeat="attrPt in attributes[1].points" style="display: inline-block;">'+
        '<img class="attrimg" ng-src="{{attrPt.img}}" ng-click="attrCtrl.selectAttribute(attributes[1], $index)"/>'+
      '</div>'+
    '</td>'+
    '<td style="width:100px;">'+
      '<div termindex term="{{attrCtrl.intelligence.name}}" class="attrLabel">'+
        '{{attrCtrl.intelligence.name}}'+
      '</div>'+
    '</td>'+
    '<td class="points-cell" style="width:245px;">'+
      '<div ng-repeat="attrPt in attrCtrl.intelligence.points" style="display: inline-block;">'+
        '<img class="attrimg" ng-src="{{attrPt.img}}" ng-click="attrCtrl.selectAttribute(attrCtrl.intelligence, $index)"/>'+
      '</div>'+
    '</td>'+
    '</tr>'
  }
})
