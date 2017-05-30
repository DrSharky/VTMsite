var app = angular.module("site");

app.controller("WillpowerController", ['WillpowerService',
  function(WillpowerService){
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

    function selectWillPt(index){
      WillpowerService.selectWillPt(index);
    }


  }]);
