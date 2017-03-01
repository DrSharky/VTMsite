var app = angular.module("site");

app.controller("ClanController", function($scope, $window, $http){

  var vm = this;
  vm.clanDescriptions = [];
  $http.get('clans/clanDescriptions.txt').then(function(response){
    vm.clanDescriptions = response.data;
  })

  this.clanPage = "clans/clanpage.html";
  this.showClanInfo = false;
  this.showBloodlineInfo = false;

  this.hasBloodlines = function(clan){
    if((clan != 'Cappadocian') && (clan != 'Gangrel') && (clan != 'Lasombra') && (clan != 'N/A') )
    return false;
    else
      return true;
  }

  this.clanList = [
    {id: 0,  name: "N/A", filters:["Bloodlines"], bloodlines: [
      {id: 0,  name: "Baali", clan: null},
      {id: 1,  name: "Blood Brothers", clan: null},
      {id: 2,  name: "Children of Osiris", clan: null},
      {id: 3,  name: "Daughters of Cacophony", clan: null},
      {id: 4,  name: "Gargoyles", clan: null},
      {id: 5, name: "Nagaraja", clan: null},
      {id: 6, name: "True Brujah", clan: null}
    ]},
    {id: 1,  name: "Assamite", filters:["Independent", "Thirteen"], bloodlines: false},
    {id: 2,  name: "Brujah", filters:["Thirteen", "Camarilla"], bloodlines: false},
    {id: 3,  name: "Caitiff", filters:["Independent"], bloodlines: false},
    {id: 4,  name: "Cappadocian", filters:["Independent", "Dark Ages"], bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Harbingers of Skulls"},
      {id: 2, name: "Lamia"},
      {id: 3, name: "Samedi"}
    ]},
    {id: 5,  name: "Followers of Set", filters:["Independent", "Thirteen"], bloodlines: false},
    {id: 6,  name: "Gangrel", filters:["Independent", "Thirteen"], bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Ahrimanes", clan: "Gangrel"},
      {id: 2, name: "Anda"},
      {id: 3, name: "Lhiannan"},
      {id: 4, name: "Noiad"},
    ]},
    {id: 7,  name: "Giovanni", filters:["Independent", "Thirteen"], bloodlines: false},
    {id: 8,  name: "Lasombra", filters:["Sabbat", "Thirteen"], bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Kiasyd"}
    ]},
    {id: 9, name: "Malkavian", filters:["Camarilla", "Thirteen"], bloodlines: false},
    {id: 10, name: "Nosferatu", filters:["Camarilla", "Thirteen"], bloodlines: false},
    {id: 11, name: "Ravnos", filters:["Independent", "Thirteen"], bloodlines: false},
    {id: 12, name: "Salubri", filters:["Independent"], bloodlines: false},
    {id: 13, name: "Toreador", filters:["Camarilla", "Thirteen"], bloodlines: false},
    {id: 14, name: "Tremere", filters:["Camarilla", "Thirteen"], bloodlines: false},
    {id: 15, name: "Tzimisce", filters:["Sabbat", "Thirteen"], bloodlines: false},
    {id: 16, name: "Ventrue", filters:["Camarilla", "Thirteen"], bloodlines: false}
  ];
  vm.filteredClanList = [];

  this.filterClans = function(filter){
    vm.filteredClanList = [];
    if(filter==='All'){
      vm.filteredClanList = vm.clanList;
      return;
    }
    this.clanList.forEach(function(clan){
      if(clan.filters.includes(filter)){
        vm.filteredClanList.push(clan);
      }
    })
  };

  this.clanFilters = ["All", "Thirteen", "Camarilla", "Sabbat","Independent",
                      "Bloodlines", "Camarilla (clans only)", "Sabbat (clans only)"];
                      // "Dark Ages", "High clans", "Low clans"];

  this.selectedClan = this.filteredClanList[0];
  this.selectedBloodline = null;
});
