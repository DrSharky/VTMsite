var app = angular.module("site");

app.controller("ClanController",
 ['$scope', 'UglyService', 'TermIndexService', 'ClanService', 'DisciplineService',
 function($scope, UglyService, TermIndexService, ClanService, DisciplineService) {

    this.clanPage = "./clans/clanpage.html";
    this.filterClans = filterClans;

    this.clanFilters = getClanFilters();
    function getClanFilters(){
      return ClanService.clanFilters;
    };

    this.clanList = getClanList();
    function getClanList(){
      return ClanService.clanList;
    };

    this.selectedClan = getSelectedClan();
    function getSelectedClan(){
      return ClanService.selectedClan;
    };

    this.selectedClanFilter = getSelectedClanFilter();
    function getSelectedClanFilter(){
      return ClanService.selectedClanFilter;
    };

    this.filteredClanList = getFilteredClanList();
    function getFilteredClanList(){
      return ClanService.filteredClanList;
    }

    function filterClans(filter){
      this.filteredClanList = ClanService.filterClans(filter);
      this.selectedClan = this.filteredClanList[0];
    };

    $scope.setUClan = function(clan) {
      UglyService.setClan(clan);
      DisciplineService.setClan(clan);
    };

    $scope.setTerm = function(term) {
      TermIndexService.setTerm(term);
    };

  }
]);
