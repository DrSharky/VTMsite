var app = angular.module("site");

app.controller("ClanController", function($window, $http){

  var vm = this;
  vm.clanDescriptions = [];
  vm.clanPage = "clans/clanpage.html";
  vm.showClanInfo = false;
  vm.showBloodlineInfo = false;
  vm.selectedBloodline = null;

  $http.get('clans/clanDescriptions.txt').then(function(response){
    vm.clanDescriptions = response.data;
  })

  vm.filterClans = filterClans;

  vm.clanFilters = ["All", "Thirteen", "Camarilla", "Sabbat", "Independent", "All Clans",
                      "All Bloodlines", "Camarilla (clans only)", "Sabbat (clans only)", "Dark Ages", "High clans", "Low clans"];

  vm.clanList = [{id:0,  name:"Ahrimanes", filters:["Sabbat", "All Bloodlines", "Dark Ages"], disciplines:["Animalism", "Potence", "Spiritus"]},
                  {id:1,  name:"Anda", filters:["Independent", "All Bloodlines", "Dark Ages"], disciplines:["Animalism", "Fortitude", "Protean"]},
                  {id:2,  name:"Assamite", filters:["Thirteen", "Independent", "All Clans", "Low Clans", "Dark Ages"], disciplines:["Celerity", "Obfuscate", "Quietus"]},
                  {id:3,  name:"Baali", filters:["Independent", "All Bloodlines", "Dark Ages"], disciplines:["Daimonion", "Obfuscate", "Presence"]},
                  {id:4,  name:"Blood Brothers", filters:["Sabbat", "All Bloodlines"], disciplines:["Fortitude", "Potence", "Sanguinus"]},
                  {id:5,  name:"Brujah", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "High Clans", "Dark Ages"], disciplines:["Celerity", "Potence", "Presence"]},
                  {id:6,  name:"Caitiff", filters:["All Clans", "Dark Ages"]},
                  {id:7,  name:"Cappadocian", filters:["All Clans", "Dark Ages", "High Clans"], disciplines:["Auspex", "Fortitude", "Necromancy (Mortis)"]},
                  {id:8,  name:"Children of Osiris", filters:["All Bloodlines", "Dark Ages"], disciplines:["Bardo"]},
                  {id:9,  name:"Daughters of Cacophony", filters:["All Bloodlines"]},
                  {id:10, name:"Followers of Set", filters:["Thirteen", "Independent", "All Clans", "Dark Ages", "Low Clans"]},
                  {id:11, name:"Gargoyles", filters:["All Bloodlines"]},
                  {id:12, name:"Gangrel", filters:["Thirteen", "Independent", "All Clans", "Low Clans", "Dark Ages"]},
                  {id:13, name:"Giovanni", filters:["Thirteen", "Independent", "All Clans", "Dark Ages"]},
                  {id:14, name:"Harbingers of Skulls", filters:["Sabbat", "All Bloodlines"]},
                  {id:15, name:"Kiasyd", filters:["All Bloodlines", "Dark Ages"]},
                  {id:16, name:"Lamia", filters:["All Bloodlines", "Dark Ages"]},
                  {id:17, name:"Lasombra", filters:["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)", "Dark Ages", "High Clans"]},
                  {id:18, name:"Lhiannan", filters:["Independent", "All Bloodlines", "Dark Ages"]},
                  {id:19, name:"Malkavian", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "Dark Ages", "Low Clans"]},
                  {id:20, name:"Nagaraja", filters:["All Bloodlines", "Dark Ages"]},
                  {id:21, name:"Noiad", filters:["All Bloodlines", "Dark Ages"]},
                  {id:22, name:"Nosferatu", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "Dark Ages", "Low Clans"]},
                  {id:23, name:"Ravnos", filters:["Thirteen", "Independent", "All Clans", "Dark Ages", "Low Clans"]},
                  {id:24, name:"Salubri", filters:["Independent", "All Clans", "Dark Ages"]},
                  {id:25, name:"Samedi", filters:["All Bloodlines"]},
                  {id:26, name:"Toreador", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "Dark Ages", "High Clans"]},
                  {id:27, name:"Tremere", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "Dark Ages", "Low Clans"]},
                  {id:28, name:"Tzimisce", filters:["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)", "Dark Ages", "High Clans"]},
                  {id:29, name:"Ventrue", filters:["Thirteen", "Camarilla", "All Clans", "Camarilla (clans only)", "Dark Ages", "High Clans"]}
                ];

  function filterClans(filter){
    vm.filteredClanList = [];
    if(filter==='All'){
      vm.filteredClanList = vm.clanList;
      return;
    }
    vm.clanList.forEach(function(clan){
      if(clan.filters.includes(filter)){
        vm.filteredClanList.push(clan);
      }
    })
    vm.selectedClan = vm.filteredClanList[0];
  };

  vm.filteredClanList = vm.clanList;
  vm.selectedClan = vm.filteredClanList[0];
  vm.selectedClanFilter = vm.clanFilters[0];
});
