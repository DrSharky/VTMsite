var app = angular.module("site");

app.controller("CharCreatorController", function($scope){
  this.selectedClan = null;
  this.clanList = [
    {id: 0,  name: "Select clan..."},
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
  this.bloodlineList = [
    {id: 1,  name: "Ahrimanes", clan: "Gangrel"},
    {id: 2,  name: "Anda", clan: "Gangrel", setting: "VDA"},
    {id: 3,  name: "Blood Brothers", clan: null},
    {id: 4,  name: "Children of Osiris", clan: null},
    {id: 5,  name: "Daughters of Cacophony", clan: null},
    {id: 6,  name: "Gargoyles", clan: null},
    {id: 7,  name: "Harbingers of Skulls", clan: "Cappadocian"},
    {id: 8,  name: "Kiasyd", clan: "Lasombra"},
    {id: 9,  name: "Lamia", clan: "Cappadocian"},
    {id: 10, name: "Lhiannan", clan: "Gangrel"},
    {id: 11, name: "Nagaraja", clan: null},
    {id: 12, name: "Noiad", clan: "Gangrel", setting: "VDA"},
    {id: 13, name: "Samedi", clan: "Cappadocian"},
    {id: 14, name: "True Brujah", clan: null}
  ];
});
