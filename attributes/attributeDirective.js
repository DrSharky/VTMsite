var app = angular.module("site");
app.directive('attrGrid', function(){
  return{
    restrict: 'E',
    controller: 'AttributesController',
    controllerAs: 'attrCtrl',
    link: function(scope, element, attrs, controller){

    },
    template: '<table>'+
              '<tr>'+
              '<th></th>'+
              '<th></th>'+
              '<th style="text-align: center; font-size 18pt; font-weight: 500;">Attributes</th>'+
              '<th></th>'+
              '<th></th>'+
              '<th></th>'+
              '</tr>'+
              '<tr>'+
              '<th style="width: 100px;">'+
              '<select ng-model="attrCtrl.selectedPriorities[0]"'+
              'ng-options="priority for priority in attrCtrl.attributePriorities"'+
              'ng-change="attrCtrl.priorityChange(attrCtrl.selectedPriorities[0], '+
              '0, attrCtrl.attributeCategories[0].priority)">'+
              '</select>'+
              '</th>'+
              '</tr>'+
              '</table>'
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
