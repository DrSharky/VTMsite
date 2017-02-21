var app = angular.module("site");

app.controller("CharCreatorController", function(){

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
    {id: 0,  name: "N/A"},
    {id: 1,  name: "Assamite"},    {id: 2,  name: "Baali"},
    {id: 3,  name: "Brujah"},      {id: 4,  name: "Caitiff"},
    {id: 5,  name: "Cappadocian"}, {id: 6,  name: "Followers of Set"},
    {id: 7,  name: "Gangrel"},     {id: 8,  name: "Giovanni"},
    {id: 9,  name: "Lasombra"},    {id: 10, name: "Malkavian"},
    {id: 11, name: "Nosferatu"},   {id: 12, name: "Ravnos"},
    {id: 13, name: "Salubri"},     {id: 14, name: "Toreador"},
    {id: 15, name: "Tremere"},     {id: 16, name: "Tzimisce"},
    {id: 17, name: "Ventrue"}
  ];
  this.selectedClan = this.clanList[0];
  this.selectedBloodline = null;


  this.cappadocianBloodlines = [
    {id: 0, name: "None"},
    {id: 1, name: "Harbingers of Skulls"},
    {id: 2, name: "Lamia", setting: "VDA"},
    {id: 3, name: "Samedi"}
  ];

  this.gangrelBloodlines = [
    {id: 0, name: "None"},
    {id: 1, name: "Ahrimanes", clan: "Gangrel"},
    {id: 2, name: "Anda", setting: "VDA"},
    {id: 3, name: "Lhiannan"},
    {id: 4, name: "Noiad", setting: "VDA"},
  ];

  this.lasombraBloodlines = [
    {id: 0, name: "None"},
    {id: 1, name: "Kiasyd"}
  ];

  this.otherBloodlines = [
    {id: 3,  name: "Blood Brothers", clan: null},
    {id: 4,  name: "Children of Osiris", clan: null},
    {id: 5,  name: "Daughters of Cacophony", clan: null},
    {id: 6,  name: "Gargoyles", clan: null},
    {id: 11, name: "Nagaraja", clan: null},
    {id: 14, name: "True Brujah", clan: null}
  ];
});
