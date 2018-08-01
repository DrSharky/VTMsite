var app = angular.module("site");

app.service("ClanService", function(){

  this.filterClans = filterClans;

  this.clanFilters =
  [
    "All", "Thirteen", "Camarilla", "Sabbat", "Independent", "All Clans",
    "All Bloodlines", "Camarilla (clans only)", "Sabbat (clans only)",
    "Dark Ages", "High Clans", "Low Clans"
  ];

  this.clanList = [{
      id: 0, name: "Ahrimanes",
      class: "Bloodline",
      parent: "Gangrel",
      filters: ["Sabbat", "All Bloodlines", "Dark Ages"],
      disciplines: ["Animalism", "Potence", "Spiritus"]
    },
    {
      id: 1, name: "Anda",
      class: "Bloodline",
      parent: "Gangrel",
      filters: ["Independent", "All Bloodlines", "Dark Ages"],
      disciplines: ["Animalism", "Fortitude", "Protean"]
    },
    {
      id: 2, name: "Assamite",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Independent", "All Clans",
        "Low Clans", "Dark Ages"
      ],
      disciplines: ["Celerity", "Obfuscate", "Quietus"]
    },
    {
      id: 3, name: "Baali",
      class: "Bloodline",
      parent: "None/Unknown",
      filters: ["Independent", "All Bloodlines", "Dark Ages"],
      disciplines: ["Daimonion", "Obfuscate", "Presence"]
    },
    {
      id: 4, name: "Blood Brothers",
      class: "Bloodline",
      parent: "None/Unknown",
      filters: ["Sabbat", "All Bloodlines"],
      disciplines: ["Fortitude", "Potence", "Sanguinus"]
    },
    {
      id: 5, name: "Brujah",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "High Clans", "Dark Ages"],
      disciplines: ["Celerity", "Potence", "Presence"]
    },
    {
      id: 6, name: "Caitiff",
      class: "None",
      parent: "None",
      filters: ["All Clans", "Dark Ages"],
      disciplines: []
    }, {
      id: 7, name: "Cappadocian",
      class: "Clan",
      parent: "None",
      filters: ["All Clans", "Dark Ages", "High Clans"],
      disciplines: ["Auspex", "Fortitude", "Necromancy"]
    },
    {
      id: 8, name: "Children of Osiris",
      class: "Bloodline",
      parent: "None/Unknown",
      filters: ["All Bloodlines", "Dark Ages"],
      disciplines: ["Bardo", "2 other disciplines learned from original clan"]
    },
    {
      id: 9, name: "Daughters of Cacophony",
      class: "Bloodline",
      parent: "Malkavian/Toreador/Ventrue",
      filters: ["All Bloodlines"],
      disciplines: ["Fortitude", "Melpominee", "Presence"]
    },
    {
      id: 10, name: "Followers of Set",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Independent", "All Clans", "Dark Ages",
                "Low Clans"],
      disciplines: ["Obfuscate", "Presence", "Serpentis"]
    },
    {
      id: 11, name: "Gargoyles",
      class: "Bloodline",
      parent: "Gangrel/Nosferatu/Tzimisce",
      filters: ["All Bloodlines"],
      disciplines: ["Flight", "Fortitude", "Potence", "Visceratika"]
    },
    {
      id: 12, name: "Gangrel",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Independent", "All Clans", "Low Clans",
                "Dark Ages"],
      disciplines: ["Animalism", "Fortitude", "Protean"]
    },
    {
      id: 13, name: "Giovanni",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Independent", "All Clans", "Dark Ages"],
      disciplines: ["Dominate", "Necromancy", "Potence"]
    },
    {
      id: 14, name: "Harbingers of Skulls",
      class: "Bloodline",
      parent: "Cappadocian",
      filters: ["Sabbat", "All Bloodlines"],
      disciplines: ["Auspex", "Fortitude", "Necromancy"]
    },
    {
      id: 15, name: "Kiasyd",
      class: "Bloodline",
      parent: "Lasombra",
      filters: ["All Bloodlines", "Dark Ages"],
      disciplines: ["Dominate", "Obtenebration", "Mytherceria"]
    },
    {
      id: 16, name: "Lamia",
      class: "Bloodline",
      parent: "Cappadocian",
      filters: ["All Bloodlines", "Dark Ages"],
      disciplines: ["Fortitude", "Necromancy", "Potence"]
    },
    {
      id: 17, name: "Lasombra",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)",
                "Dark Ages", "High Clans"],
      disciplines: ["Dominate", "Obtenebration", "Potence"]
    },
    {
      id: 18, name: "Lhiannan",
      class: "Bloodline",
      parent: "Gangrel",
      filters: ["Independent", "All Bloodlines", "Dark Ages"],
      disciplines: ["Animalism", "Ogham", "Presence"]
    },
    {
      id: 19, name: "Malkavian",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "Dark Ages", "Low Clans"],
      disciplines: ["Auspex", "Dementation", "Obfuscate"]
    },
    {
      id: 20, name: "Nagaraja",
      class: "Bloodline",
      parent: "None",
      filters: ["All Bloodlines", "Dark Ages"],
      disciplines: ["Auspex", "Dominate", "Necromancy"]
    },
    {
      id: 21, name: "Noiad",
      class: "Bloodline",
      parent: "Gangrel",
      filters: ["All Bloodlines", "Dark Ages"],
      disciplines: ["Animalism", "Auspex", "Protean"]
    },
    {
      id: 22, name: "Nosferatu",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "Dark Ages", "Low Clans"],
      disciplines: ["Animalism", "Obfuscate", "Potence"]
    },
    {
      id: 23, name: "Ravnos",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Independent", "All Clans", "Dark Ages",
                "Low Clans"],
      disciplines: ["Animalism", "Chimerstry", "Fortitude"]
    },
    {
      id: 24, name: "Salubri",
      class: "Bloodline",
      parent: "None",
      filters: ["Independent", "All Clans", "Dark Ages", "All Bloodlines"],
      disciplines: ["Auspex", "Fortitude", "Obeah", "Valeren"]
    },
    {
      id: 25, name: "Samedi",
      class: "Bloodline",
      parent: "Cappadocian",
      filters: ["All Bloodlines"],
      disciplines: ["Fortitude", "Obfuscate", "Thanatosis"]
    },
    {
      id: 26, name: "Toreador",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "Dark Ages", "High Clans"],
      disciplines: ["Auspex", "Celerity", "Presence"]
    },
    {
      id: 27, name: "Tremere",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "Dark Ages", "Low Clans"],
      disciplines: ["Auspex", "Dominate", "Thaumaturgy"]
    },
    {
      id: 28, name: "True Brujah",
      class: "Bloodline",
      parent: "None/Brujah",
      filters: ["All Bloodlines", "Independent", "Dark Ages"],
      disciplines: ["Potence", "Presence", "Temporis"]
    },
    {
      id: 29, name: "Tzimisce",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Sabbat", "All Clans", "Sabbat (clans only)",
                "Dark Ages", "High Clans"],
      disciplines: ["Animalism", "Auspex", "Vicissitude"]
    },
    {
      id: 30, name: "Ventrue",
      class: "Clan",
      parent: "None",
      filters: ["Thirteen", "Camarilla", "All Clans",
                "Camarilla (clans only)", "Dark Ages", "High Clans"],
      disciplines: ["Dominate", "Fortitude", "Presence"]
    }
  ];

  this.filteredClanList = this.clanList;
  this.selectedClan = this.filteredClanList[0];
  this.selectedClanFilter = this.clanFilters[0];

  function filterClans(filter) {
    this.filteredClanList = [];
    if (filter === 'All') {
      this.filteredClanList = this.clanList;
      return this.filteredClanList;
    }
    for(var i = 0; i<this.clanList.length; i++){
      if(this.clanList[i].filters.includes(filter)){
        this.filteredClanList.push(this.clanList[i]);
      }
    }
    return this.filteredClanList;
  };

});
