var app = angular.module("site");

app.controller("ClanController", function(){

  this.clanPage = "clans/clanpage.html";

  this.clanDescriptions = {
    Ahrimanes: "The Ahrimanes are a rare, all-female bloodline of Kindred that originally "+
    "existed during the Dark Ages, headed by a woman called Ádísa. "+
    "Sometime during the long night, Ádísa and her bloodline were lost "+
    "and subsumed into Clan Gangrel. Centuries later, the bloodline was unknowingly "+
    "resurrected by a woman called Muricia. Since then, the Ahrimanes roam the night again, "+
    "albeit under a different guise and leader.",
    Assamite: "The Assamites are one of the thirteen vampire clans of the Classic World of Darkness. "+
    "Based in their hidden fortress Alamut in the Middle East, they are traditionally seen by Western Kindred "+
    "as dangerous assassins and diablerists, but in truth they are guardians, warriors and scholars who "+
    "seek to distance themselves from the Jyhad. Throughout their history, they have remained a self-sufficient and independent clan.",
    Baali: "The Baali are a bloodline of vampires associated with demon worship. Because of their affinity with the unholy, "+
    "the Baali are particularly vulnerable to holy iconography, holy ground and holy water. They are highly vulnerable to True Faith. "+
    "Some versions present the true purpose of the Baali as keeping demons sleeping by feeding them with carnage and destruction. "+
    "But most presentations show them as Infernalists, using demon worship to gain additional power.",
    Brujah: "The Brujah are one of the fifteen clans of Kindred in Vampire: The Masquerade. "+
    "Quick to anger and always passionate in the Modern Nights, they have been regaining their "+
    "position as a clan of lofty philosophers and activists, and are often pointed to as a clan "+
    "of unruly rebels and roughnecks that should not be messed with.",
    Caitiff: "Caitiff are vampires with no known clan. It can mean that they were abandoned and therefore do not know their lineage, "+
    "or that they have no traits of the clan that they were embraced into. Caitiff have no inherent clan disciplines, but they also do not "+
    "have any clan weakness. They are typically looked down upon by every other type of vampire, whether it's with distaste or pity.",
    Cappadocian: "The Cappadocians, the \"Clan of Death\", were one of the thirteen vampire clans of the Classic World of Darkness. "+
    "Detached scholars obsessed with the mysteries of death and the soul, they are now (theoretically) extinct, "+
    "having been systematically eliminated through a coup de famille conducted by Augustus Giovanni. "+
    "Unfortunately for the Giovanni, they may have underestimated what it takes to kill a clan of experts on death.",
    'Followers of Set': "The Followers of Set (or Setites) are a clan of vampires who believe their founder was the Egyptian god Set. "+
    "Orthodox Setite belief dictates that Set will one day return to rule or consume the world, and devout Setites prepare "+
    "the way for his resurrection. To this end, the clan remains independent of the Sects of other Kindred, "+
    "and practice with great skill the arts of corruption, deceit and ancient sorcery.",
    Gangrel: "The Gangrel are one of the thirteen vampire clans found in the Classic World of Darkness. "+
    "Nomads who hold closer ties to the wild places than most of their city-bound cousins, "+
    "they are also closer to the animal aspect of the Beast, and are masters of the Protean Discipline.",
    'Harbingers of Skulls': "The Harbingers of Skulls are a rare bloodline who surfaced in the Final Nights. "+
    "While few Kindred suspect the truth, they are the last remnants of the Cappadocian clan.",
    Lamia: "Lamia was a bloodline of the Cappadocian clan, founded after Lamia (a rumored descendant and high priestess of Lilith). "+
    "Members of this bloodline served the Cappadocians as dervishes and warriors until the purge orchestrated by the Giovanni, in 1444.",
    Samedi: "The Samedi bloodline has a relatively short but immensely curious history within kindred society. "+
    "Originating most likely in the Caribbean, the bloodline's members all seem to resemble a zombie or a corpse. "+
    "Unlike the Nosferatu, who merely become disfigured, the body of the Samedi appears to be in a constant state of decay."
  };

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

  // this.getBloodlinePage = function(bloodline){
  //   if(bloodline === "N/A" || bloodline === "None" || bloodline === null)
  //     return null;
  //   this.bloodlinePage = "clans/"+bloodline+".html";
  //   this.showBloodlineInfo = true;
  //   return this.bloodlinePage;
  // };

  this.clanList = [
    {id: 0,  name: "N/A", bloodlines: [
      {id: 3,  name: "Blood Brothers", clan: null},
      {id: 4,  name: "Children of Osiris", clan: null},
      {id: 5,  name: "Daughters of Cacophony", clan: null},
      {id: 6,  name: "Gargoyles", clan: null},
      {id: 11, name: "Nagaraja", clan: null},
      {id: 14, name: "True Brujah", clan: null}
    ]},
    {id: 1,  name: "Assamite", bloodlines: false},
    {id: 2,  name: "Baali", bloodlines: false},
    {id: 3,  name: "Brujah", bloodlines: false},
    {id: 4,  name: "Caitiff", bloodlines: false},
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
    {id: 11, name: "Nosferatu", bloodlines: false},
    {id: 12, name: "Ravnos", bloodlines: false},
    {id: 13, name: "Salubri", bloodlines: false},
    {id: 14, name: "Toreador", bloodlines: false},
    {id: 15, name: "Tremere", bloodlines: false},
    {id: 16, name: "Tzimisce", bloodlines: false},
    {id: 17, name: "Ventrue", bloodlines: false}
  ];
  this.selectedClan = this.clanList[0];
  this.selectedBloodline = null;
});
