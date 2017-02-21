var app = angular.module("site");

app.controller("ClanController", function(){

  this.clanPage = "clans/clanpage.html";

  // this.clanDescriptions = [];

  this.showClanInfo = false;
  this.showBloodlineInfo = false;

  this.hasBloodlines = function(clan){
    if((clan != 'Cappadocian') && (clan != 'Gangrel') && (clan != 'Lasombra') && (clan != 'N/A') )
    return false;
    else
      return true;
  }

  // this.getClanPage = function(clan){
  //    if(clan === "N/A")
  //      return null;
  //    this.clanPage = "clans/"+clan+".html";
  //    this.showClanInfo = true;
  //    return this.clanPage;
  //   return "clans/clanpage.html";
  // };

  this.getBloodlinePage = function(bloodline){
    if(bloodline === "N/A" || bloodline === "None" || bloodline === null)
      return null;
    this.bloodlinePage = "clans/"+bloodline+".html";
    this.showBloodlineInfo = true;
    return this.bloodlinePage;
  };

  this.clanList = [
    {id: 0,  name: "N/A", bloodlines: [
      {id: 3,  name: "Blood Brothers", clan: null},
      {id: 4,  name: "Children of Osiris", clan: null},
      {id: 5,  name: "Daughters of Cacophony", clan: null},
      {id: 6,  name: "Gargoyles", clan: null},
      {id: 11, name: "Nagaraja", clan: null},
      {id: 14, name: "True Brujah", clan: null}
    ]},
    {id: 1,  name: "Assamite", bloodlines: false},    {id: 2,  name: "Baali", bloodlines: false},
    {id: 3,  name: "Brujah", bloodlines: false},      {id: 4,  name: "Caitiff", bloodlines: false},
    {id: 5,  name: "Cappadocian", bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Harbingers of Skulls"},
      {id: 2, name: "Lamia", setting: "VDA"},
      {id: 3, name: "Samedi"}
    ]},
    {id: 6,  name: "Followers of Set", bloodlines: false},
    {id: 7,  name: "Gangrel", bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Ahrimanes", clan: "Gangrel"},
      {id: 2, name: "Anda", setting: "VDA"},
      {id: 3, name: "Lhiannan"},
      {id: 4, name: "Noiad", setting: "VDA"},
    ]},
    {id: 8,  name: "Giovanni", bloodlines: false},
    {id: 9,  name: "Lasombra", bloodlines: [
      {id: 0, name: "None"},
      {id: 1, name: "Kiasyd"}
    ]},
    {id: 10, name: "Malkavian", bloodlines: false},
    {id: 11, name: "Nosferatu", bloodlines: false},   {id: 12, name: "Ravnos", bloodlines: false},
    {id: 13, name: "Salubri", bloodlines: false},     {id: 14, name: "Toreador", bloodlines: false},
    {id: 15, name: "Tremere", bloodlines: false},     {id: 16, name: "Tzimisce", bloodlines: false},
    {id: 17, name: "Ventrue", bloodlines: false}
  ];
  this.selectedClan = this.clanList[0];
  this.selectedBloodline = null;
});
