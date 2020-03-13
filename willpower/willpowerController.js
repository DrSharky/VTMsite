var app = angular.module("site");

app.controller("WillpowerController",
 ['WillpowerService', '$scope',
  function(WillpowerService, $scope){

    this.freeMode = location.hash.includes("free");
    this.freeWillPt = freeWillPt;

    this.willPage = "./willpower/willpower.html";

    this.willpower = willpower();
    function willpower(){
      return WillpowerService.willpower;
    }

    this.getFreebieMode = getFreebieMode;
    this.selectWillPt = selectWillPt;

    function getFreebieMode(){
      return WillpowerService.getFreebieMode();
    };

    function freeWillPt(index){
      WillpowerService.freeWillPt(index);
    }

    function selectWillPt(index){
      WillpowerService.selectWillPt(index);
    }

    var self = this;
    $scope.$on('$routeChangeSuccess', initScope);

    function initScope(){
      if(!WillpowerService.loadedCharacter){
        WillpowerService.resetWillpower();
      }
    }

    $scope.$on('loadCharacter', function(){
      WillpowerService.loadedCharacter = true;
      self.willpower = WillpowerService.willpower;
      $scope.$apply();
    });

    $scope.$on('resetCharacter', function(){
      WillpowerService.loadedCharacter = false;
      WillpowerService.resetWillpower();
    });

  }]);
