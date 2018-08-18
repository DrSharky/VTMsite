app.directive("abilityDirect", function(){
  return {
    transclude: true,
    controller: 'AbilitiesController',
    controllerAs: 'abCtrl',
    bindToController: true,
    template: '<div class="abil-center">'+
                '<div termindex term="{{ability.name}}" class="abLabel">'+
                  '{{ability.name}}'+
                '</div>'+
                '<div ng-repeat="abpt in ability.points" style="display: inline-block;">'+
                  '<img class="abimg" ng-src="{{abpt.img}}" ng-click="abCtrl.selectAbility(ability, $index, 0)"/>'+
                '</div>'+
              '</div>'
  };
});
