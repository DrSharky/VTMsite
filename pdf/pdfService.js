var app = angular.module("site");
app.service('PdfService',
['$http', 'CharCreatorService', 'ClanService', 'AttributesService',
 'AbilitiesService', 'DisciplineService', 'BackgroundsService', 'VirtuesService',
 'MeritFlawService', 'PathService', 'WillpowerService',
function($http, CharCreatorService, ClanService, AttributesService,
   AbilitiesService, DisciplineService, BackgroundsService, VirtuesService,
   MeritFlawService, PathService, WillpowerService){

  this.imgData = "";
  this.generatePDF = generatePDF;
  this.generateInteractivePDF = generateInteractivePDF;
  this.drawPoints = drawPoints;
  this.drawPath = drawPath;
  this.createPoints = createPoints;
  this.createPathPoints = createPathPoints;
  this.createDisciplinePoints = createDisciplinePoints;
  this.createBackgroundPoints = createBackgroundPoints;
  this.addAttrSpecialties = addAttrSpecialties;
  this.addTalentSpecialties = addTalentSpecialties;
  this.addSkillSpecialties = addSkillSpecialties;
  this.addKnowledgeSpecialties = addKnowledgeSpecialties;
  // this.addCustomDots = addCustomDots;
  this.addVirtueText = addVirtueText;
  this.addMeritBoxes = addMeritBoxes;
  this.addFlawBoxes = addFlawBoxes;
  this.addPathBoxes = addPathBoxes;
  this.createWillPoints = createWillPoints;
  this.createHealthBoxes = createHealthBoxes;
  this.createWeaknessBox = createWeaknessBox;
  this.createExpBox = createExpBox;
  this.generateLongPDF = generateLongPDF;

  var self = this;
  $http.get('./pdf/pdfImage.txt').then(function(response){
    self.imgData = response.data;
  });

  this.page1 = "";
  this.page2 = "";
  this.page3 = "";
  this.page4 = "";
  $http.get('./pdf/4pgimages/page1.txt').then(function(response){
    self.page1 += response.data;
  });
  $http.get('./pdf/4pgimages/page2.txt').then(function(response){
    self.page2 += response.data;
  });
  $http.get('./pdf/4pgimages/page3.txt').then(function(response){
    self.page3 += response.data;
  });
  $http.get('./pdf/4pgimages/page4.txt').then(function(response){
    self.page4 += response.data;
  });


  function generateLongPDF(){
    var doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.addImage(this.page1, 'JPEG', 0, 0, width, height);
    doc.addPage();
    doc.setPage(2);
    doc.addImage(this.page2, 'JPEG', 0, 0, width, height);
    doc.addPage();
    doc.setPage(3);
    doc.addImage(this.page3, 'JPEG', 0, 0, width, height);
    doc.addPage();
    doc.setPage(4);
    doc.addImage(this.page4, 'JPEG', 0, 0, width, height);
    doc.save("Long.pdf");
  }

  function generatePDF(){
    var doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(this.imgData, 'JPEG', 0, 0, width, height);
    doc.setFontSize(11);

    if(CharCreatorService.charName == null || CharCreatorService.charNature == null ||
       ClanService.selectedClan.name == null || CharCreatorService.charPlayer == null ||
       CharCreatorService.charDemeanor == null || CharCreatorService.charGeneration == null ||
       CharCreatorService.charChronicle == null || CharCreatorService.charConcept == null ||
       CharCreatorService.charSire == null){
         alert("At least all player info boxes must be filled to create a pdf!");
         return;
       }

    doc.text(32.9, 41.8, CharCreatorService.charName);
    doc.text(91.5, 41.8, CharCreatorService.charNature);
    doc.text(144.7, 41.8, ClanService.selectedClan.name);
    doc.text(34.1, 47.7, CharCreatorService.charPlayer);
    doc.text(97.2, 47.7, CharCreatorService.charDemeanor);
    doc.text(155.8, 47.7, CharCreatorService.charGeneration);
    doc.text(39.4, 53.5, CharCreatorService.charChronicle);
    doc.text(93.2, 53.5, CharCreatorService.charConcept);
    doc.text(144.1, 53.5, CharCreatorService.charSire);

    var attrPosition = 59.74;
    var attrHeight = 71.52;

    for(var i = 0; i < Object.keys(AttributesService.attributesList).length; i++){
      this.drawPoints(Object.values(AttributesService.attributesList)[i], attrPosition, attrHeight, doc);
      attrHeight += 4.7;
      if(i == 2){
        attrPosition += 57.3;
        attrHeight = 71.52;
      }
      if(i == 5){
        attrPosition += 57;
        attrHeight = 71.52;
      }
    }

    var abPosition = 59.74;
    var abHeight = 99.8;
    for(var i = 0; i < Object.keys(AbilitiesService.abilitiesList).length; i++){
      var ability = Object.values(AbilitiesService.abilitiesList)[i];
      switch(ability.id){
        case "customtalent":
            doc.text(21, 148.05, ability.name);
            break;
        case "customskill":
            doc.text(77.9, 148.05, ability.name);
            break;
        case "customknowledge":
            doc.text(135.3, 148.05, ability.name);
            break;
        default:
            break;
      }

      this.drawPoints(ability, abPosition, abHeight, doc);
      abHeight += 4.72;
      if(i == 10){
        abPosition += 57.3;
        abHeight = 99.8;
      }
      if(i == 21){
        abPosition += 57.1;
        abHeight = 99.8;
      }
    }

    var discPosition = 59.74;
    var discHeight = 165.8;
    for(var i = 0; i < Object.keys(DisciplineService.selectedClanDisciplines).length; i++){
      doc.text(24.7, discHeight+1, Object.values(DisciplineService.selectedClanDisciplines)[i].name);
      this.drawPoints(Object.values(DisciplineService.selectedClanDisciplines)[i], discPosition, discHeight, doc);
      discHeight += 4.7;
    }

    var backPosition = 117;
    var backHeight = 165.8;
    for(var i = 0; i < Object.keys(BackgroundsService.selectedList).length; i++){
      doc.text(82.7, backHeight+1, Object.values(BackgroundsService.selectedList)[i].name);
      this.drawPoints(Object.values(BackgroundsService.selectedList)[i], backPosition, backHeight, doc);
      backHeight += 4.7;
    }

    var virtPosition = 174.04;
    var virtHeight = 165.8;
    for(var i = 0; i < Object.keys(VirtuesService.virtueList).length; i++){
      this.drawPoints(Object.values(VirtuesService.virtueList)[i], virtPosition, virtHeight, doc);
      virtHeight += 9.4;
    }

    MeritFlawService.createMasterLists();

    var meritPosition = 67.5;
    var meritHeight = 214;
    for(var i = 0; i < MeritFlawService.masterMeritList.length; i++){
      doc.text(24.7, meritHeight, MeritFlawService.masterMeritList[i].name);
      doc.text(meritPosition, meritHeight, MeritFlawService.masterMeritList[i].pointCost.toString());
      meritHeight += 4.7;
    }

    var flawPosition = 67.5;
    var flawHeight = 247;
    for(var i = 0; i < MeritFlawService.masterFlawList.length; i++){
      doc.text(24.7, flawHeight, MeritFlawService.masterFlawList[i].name);
      doc.text(flawPosition, flawHeight, MeritFlawService.masterFlawList[i].pointCost.toString());
      flawHeight += 4.7;
    }

    var pathPosition = 84.89;
    var pathHeight = 208.4;
    doc.text(pathPosition+2, pathHeight, PathService.selectedPath.name);
    this.drawPath(PathService.selectedPath, pathPosition, pathHeight+3.21, doc);

    var willPosition = 84.89;
    var willHeight = 234.12;
    this.drawPath(WillpowerService.willpower, willPosition, willHeight, doc);

    doc.save("character_sheet_" + CharCreatorService.charName+".pdf");
  }

  function generateInteractivePDF(){
    var doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(this.imgData, 'JPEG', 0, 0, width, height);
    doc.setFontSize(11);

    if(CharCreatorService.charName == null || CharCreatorService.charNature == null ||
       ClanService.selectedClan.name == null || CharCreatorService.charPlayer == null ||
       CharCreatorService.charDemeanor == null || CharCreatorService.charGeneration == null ||
       CharCreatorService.charChronicle == null || CharCreatorService.charConcept == null ||
       CharCreatorService.charSire == null){
         alert("At least all player info boxes must be filled to create a pdf!");
         return;
       }

    var charName = new TextField();
    charName.Rect = [32.9, 37.8, 45, 6];
    charName.V = CharCreatorService.charName;
    charName.T = 'CharName';
    charName.DA = null;
    doc.addField(charName);

    var charNature = new TextField();
    charNature.Rect = [91.5, 37.8, 43, 6];
    charNature.V = CharCreatorService.charNature;
    charNature.T = 'CharNature';
    charNature.DA = null;
    doc.addField(charNature);

    var charClan = new TextField();
    charClan.Rect = [144.7, 37.8, 43, 6];
    charClan.V = ClanService.selectedClan.name;
    charClan.T = 'CharClan';
    charClan.DA = null;
    doc.addField(charClan);

    var charPlayer = new TextField();
    charPlayer.Rect = [33.1, 44, 42, 6];
    charPlayer.V = CharCreatorService.charPlayer;
    charPlayer.T = 'CharPlayer';
    charPlayer.DA = null;
    doc.addField(charPlayer);

    var charDemeanor = new TextField();
    charDemeanor.Rect = [95.4, 44, 39, 6];
    charDemeanor.V = CharCreatorService.charDemeanor;
    charDemeanor.T = 'CharDemeanor';
    charDemeanor.DA = null;
    doc.addField(charDemeanor);

    var charGeneration = new TextField();
    charGeneration.Rect = [154, 44, 32, 6];
    charGeneration.V = CharCreatorService.charGeneration;
    charGeneration.T = 'CharGeneration';
    charGeneration.DA = null;
    doc.addField(charGeneration);

    var charChronicle = new TextField();
    charChronicle.Rect = [37.4, 49.7, 38.5, 6];
    charChronicle.V = CharCreatorService.charChronicle;
    charChronicle.T = 'CharChronicle';
    charChronicle.DA = null;
    doc.addField(charChronicle);

    var charConcept = new TextField();
    charConcept.Rect = [92, 49.7, 43, 6];
    charConcept.V = CharCreatorService.charConcept;
    charConcept.T = 'CharConcept';
    charConcept.DA = null;
    doc.addField(charConcept);

    var charSire = new TextField();
    charSire.Rect = [143.8, 49.7, 43, 6];
    charSire.V = CharCreatorService.charSire;
    charSire.T = 'CharSire';
    charSire.DA = null;
    doc.addField(charSire);

    addAttrSpecialties(doc);
    addTalentSpecialties(doc);
    addSkillSpecialties(doc);
    addKnowledgeSpecialties(doc);

    var attrPosition = 57.25;
    var attrHeight = 69.05;

    for(var i = 0; i < Object.keys(AttributesService.attributesList).length; i++){
      this.createPoints(Object.values(AttributesService.attributesList)[i], attrPosition, attrHeight, doc);
      attrHeight += 4.72;
      if(i == 2){
        attrPosition += 57.37;
        attrHeight = 69.05;
      }
      if(i == 5){
        attrPosition += 56.96;
        attrHeight = 69.05;
      }
    }

    var abPosition = 57.25;
    var abHeight = 97.37;

    for(var i = 0; i < Object.keys(AbilitiesService.abilitiesList).length; i++){
      var ability = Object.values(AbilitiesService.abilitiesList)[i];
      switch(ability.id){
        case "customtalent":
            var customTalent = new TextField();
            customTalent.Rect = [20, 143.67, 39, 6];
            customTalent.DA = null;
            customTalent.V = ability.name;
            doc.addField(customTalent);
            break;
        case "customskill":
            var customSkill = new TextField();
            customSkill.Rect = [77, 143.67, 38.6, 6];
            customSkill.DA = null;
            customSkill.V = ability.name
            doc.addField(customSkill);
            break;
        case "customknowledge":
            var customKnowledge = new TextField();
            customKnowledge.Rect = [134.21, 143.67, 38.6, 6];
            customKnowledge.DA = null;
            customKnowledge.V = ability.name;
            doc.addField(customKnowledge);
            break;
        default:
            break;
      }
      this.createPoints(ability, abPosition, abHeight, doc);
      abHeight += 4.7095;
      if(i == 10){
        abPosition += 57.37;
        abHeight = 97.37;
      }
      if(i == 21){
        abPosition += 56.96;
        abHeight = 97.37;
      }
    }

    // var customDotPos = 57.25;
    // var customDotHeight = 144.465;
    // addCustomDots(customDotPos, customDotHeight, doc);

    var discNamePos = 20.45;
    var discNameHeight = 162.39;
    var discPtHeight = 163.32;
    var discPtPos = 57.25;
    createDisciplinePoints(discNamePos, discNameHeight, discPtPos, discPtHeight, doc);


    var bgNamePos = 77.55;
    var bgNameHeight = 162.39;
    var bgPtPos = 114.54;
    var bgPtHeight = 163.32;
    createBackgroundPoints(bgNamePos, bgNameHeight, bgPtPos, bgPtHeight, doc);

    var virtPosition = 171.57;
    var virtHeight = 163.3;

    for(var i = 0; i < Object.keys(VirtuesService.virtueList).length; i++){
      this.createPoints(Object.values(VirtuesService.virtueList)[i], virtPosition, virtHeight, doc);
      virtHeight += 9.45;
    }

    addVirtueText(doc);

    MeritFlawService.createMasterLists();

    var meritBoxPos = 20.45;
    var meritBoxHeight = 209.07;
    addMeritBoxes(meritBoxPos, meritBoxHeight, doc);

    var flawBoxPos = 20.45;
    var flawBoxHeight = 242.6;
    addFlawBoxes(flawBoxPos, flawBoxHeight, doc);

    var pathBoxPos = 84;
    var pathBoxHeight = 203.9;
    addPathBoxes(pathBoxPos, pathBoxHeight, doc);

    createPathPoints(PathService.selectedPath, 82.26, 209.13, doc);

    createWillPoints(82.26, 231.6, doc);

    createBloodBoxes(83.46, 254.9, doc);

    createHealthBoxes(181.015, 205.13, doc);

    createWeaknessBox(137.6, 245.4, doc);

    createExpBox(137.6, 259.4, doc);

    doc.save("character_sheet_" + CharCreatorService.charName+".pdf");
  }

  function createPoints(attribute, position, height, doc){
    for(point in attribute.points){
      var circle = new CheckCircle();
      circle.Rect = [position, height, 5, 5];
      doc.addField(circle);
      position += 2.83;
      if(attribute.points[point].type == ""){
        circle.V = "/Off";
        circle.AS = "/Off";
      }
    }
  }

  function createDisciplinePoints(discNamePos, discNameHeight, discPtPos, discPtHeight, doc){
    var discPtList = [];
    var discNameList = [];
    for(var i = 0; i < Object.keys(DisciplineService.selectedClanDisciplines).length; i++){
      discPtList.push(Object.values(DisciplineService.selectedClanDisciplines)[i].points);
      discNameList.push(Object.values(DisciplineService.selectedClanDisciplines)[i].name);
    }
    var discHeight = discPtHeight;
    for(var j = 0; j < 6; j++){
      var discText = new TextField();
      discText.Rect = [discNamePos, discNameHeight, 38.6, 6];
      discText.DA = null;
      var discPosition = discPtPos;
      for(var k = 0; k < 5; k++){
        var circle = new CheckCircle();
        circle.Rect = [discPosition, discHeight, 5, 5];
          if(discPtList[j] != null){
            if(discPtList[j][k] != null){
              if(discPtList[j][k].type == ""){
                circle.V = "/Off";
                circle.AS = "/Off";
              }
            }
          }
          else{
            circle.V = "/Off";
            circle.AS = "/Off";
          }
        doc.addField(circle);
        discPosition += 2.83;
      }
      if(discNameList[j] != null)
        discText.V = discNameList[j];
      else
        discText.V = "";
      discHeight += 4.7095;
      doc.addField(discText);
      discNameHeight += 4.7095;
    }
  }

  function createBackgroundPoints(bgNamePos, bgNameHeight, bgPtPos, bgPtHeight, doc){
    var bgPtList = [];
    var bgNameList = [];
    for(var i = 0; i < Object.keys(BackgroundsService.selectedList).length; i++){
      bgPtList.push(Object.values(BackgroundsService.selectedList)[i].points);
      bgNameList.push(Object.values(BackgroundsService.selectedList)[i].name);
    }
    var bgHeight = bgPtHeight;
    for(var j = 0; j < 6; j++){
      var bgText = new TextField();
      bgText.Rect = [bgNamePos, bgNameHeight, 38.4, 6];
      bgText.DA = null;
      var bgPosition = bgPtPos;
      for(var k = 0; k < 5; k++){
        var circle = new CheckCircle();
        circle.Rect = [bgPosition, bgHeight, 5, 5];
          if(bgPtList[j] != null){
            if(bgPtList[j][k] != null){
              if(bgPtList[j][k].type == ""){
                circle.V = "/Off";
                circle.AS = "/Off";
              }
            }
          }
          else{
            circle.V = "/Off";
            circle.AS = "/Off";
          }
        doc.addField(circle);
        bgPosition += 2.83;
      }
      if(bgNameList[j] != null)
        bgText.V = bgNameList[j];
      else
        bgText.V = "";
      bgHeight += 4.7095;
      doc.addField(bgText);
      bgNameHeight += 4.7095;
    }
  }

  function createPathPoints(path, position, height, doc){
    for(point in path.points){
      var circle = new CheckCircle();
      circle.Rect = [position, height, 5, 5];
      doc.addField(circle);
      position += 4.23;
      if(path.points[point].type == ""){
        circle.V = "/Off";
        circle.AS = "/Off";
      }
    }
  }

  function addAttrSpecialties(doc){
    var strengthSpec = new TextField();
    strengthSpec.Rect = [35.5, 68, 22, 6];
    strengthSpec.DA = null;
    doc.addField(strengthSpec);
    var dexSpec = new TextField();
    dexSpec.Rect = [36.5, 72.7, 21, 6];
    dexSpec.DA = null;
    doc.addField(dexSpec);
    var staminaSpec = new TextField();
    staminaSpec.Rect = [35.3, 77.4, 22.2, 6];
    staminaSpec.DA = null;
    doc.addField(staminaSpec);

    var charismaSpec = new TextField();
    charismaSpec.Rect = [94, 68, 23, 6];
    charismaSpec.DA = null;
    doc.addField(charismaSpec);
    var manipulationSpec = new TextField();
    manipulationSpec.Rect = [100.1, 72.7, 17.1, 6];
    manipulationSpec.DA = null;
    doc.addField(manipulationSpec);
    var appearanceSpec = new TextField();
    appearanceSpec.Rect = [97, 77.4, 19.5, 6];
    appearanceSpec.DA = null;
    doc.addField(appearanceSpec);

    var perceptionSpec = new TextField();
    perceptionSpec.Rect = [153, 68, 19, 6];
    perceptionSpec.DA = null;
    doc.addField(perceptionSpec);
    var intelligenceSpec = new TextField();
    intelligenceSpec.Rect = [154, 72.7, 18.4, 6];
    intelligenceSpec.DA = null;
    doc.addField(intelligenceSpec);
    var witsSpec = new TextField();
    witsSpec.Rect = [143.5, 77.4, 27.5, 6];
    witsSpec.DA = null;
    doc.addField(witsSpec);
  }

  function addTalentSpecialties(doc){
    var alertSpec = new TextField();
    alertSpec.Rect = [35.42, 96.4, 23.3, 6];
    alertSpec.DA = null;
    doc.addField(alertSpec);
    var athleticsSpec = new TextField();
    athleticsSpec.Rect = [35.14, 101.2, 23.3, 6];
    athleticsSpec.DA = null;
    doc.addField(athleticsSpec);
    var awareSpec = new TextField();
    awareSpec.Rect = [37.6, 105.92, 20.9, 6];
    awareSpec.DA = null;
    doc.addField(awareSpec);
    var brawlSpec = new TextField();
    brawlSpec.Rect = [30.5, 110.64, 28, 6];
    brawlSpec.DA = null;
    doc.addField(brawlSpec);
    var empathySpec = new TextField();
    empathySpec.Rect = [35.4, 115.36, 23.4, 6];
    empathySpec.DA = null;
    doc.addField(empathySpec);
    var expressSpec = new TextField();
    expressSpec.Rect = [38.3, 120.08, 20.2, 6];
    expressSpec.DA = null;
    doc.addField(expressSpec);
    var intimSpec = new TextField();
    intimSpec.Rect = [41.32, 124.80, 17.4, 6];
    intimSpec.DA = null;
    doc.addField(intimSpec);
    var leaderSpec = new TextField();
    leaderSpec.Rect = [38.4, 129.52, 20.2, 6];
    leaderSpec.DA = null;
    doc.addField(leaderSpec);
    var streetSpec = new TextField();
    streetSpec.Rect = [37, 134.24, 21.2, 6];
    streetSpec.DA = null;
    doc.addField(streetSpec);
    var subSpec = new TextField();
    subSpec.Rect = [38.4, 138.97, 20.3, 6];
    subSpec.DA = null;
    doc.addField(subSpec);
  }

  function addSkillSpecialties(doc){
    var animalSpec = new TextField();
    animalSpec.Rect = [98, 96.4, 18.2, 6];
    animalSpec.DA = null;
    doc.addField(animalSpec);
    var craftsSpec = new TextField();
    craftsSpec.Rect = [87.5, 101.2, 28.7, 6];
    craftsSpec.DA = null;
    doc.addField(craftsSpec);
    var driveSpec = new TextField();
    driveSpec.Rect = [87.13, 105.92, 28.9, 6];
    driveSpec.DA = null;
    doc.addField(driveSpec);
    var etiqSpec = new TextField();
    etiqSpec.Rect = [92.82, 110.64, 23.2, 6];
    etiqSpec.DA = null;
    doc.addField(etiqSpec);
    var fireSpec = new TextField();
    fireSpec.Rect = [92.2, 115.36, 24.1, 6];
    fireSpec.DA = null;
    doc.addField(fireSpec);
    var larcenySpec = new TextField();
    larcenySpec.Rect = [90.5, 120.08, 25.4, 6];
    larcenySpec.DA = null;
    doc.addField(larcenySpec);
    var meleeSpec = new TextField();
    meleeSpec.Rect = [87.6, 124.80, 28, 6];
    meleeSpec.DA = null;
    doc.addField(meleeSpec);
    var performSpec = new TextField();
    performSpec.Rect = [98.7, 129.52, 17.6, 6];
    performSpec.DA = null;
    doc.addField(performSpec);
    var stealthSpec = new TextField();
    stealthSpec.Rect = [89, 134.24, 26.8, 6];
    stealthSpec.DA = null;
    doc.addField(stealthSpec);
    var survivalSpec = new TextField();
    survivalSpec.Rect = [91, 138.97, 25.2, 6];
    doc.addField(survivalSpec);
  }

  function addKnowledgeSpecialties(doc){
    var academSpec = new TextField();
    academSpec.Rect = [152.2, 96.4, 20.6, 6];
    academSpec.DA = null;
    doc.addField(academSpec);
    var computerSpec = new TextField();
    computerSpec.Rect = [152.04, 101.2, 20, 6];
    computerSpec.DA = null;
    doc.addField(computerSpec);
    var financeSpec = new TextField();
    financeSpec.Rect = [147.89, 105.92, 24.4, 6];
    financeSpec.DA = null;
    doc.addField(financeSpec);
    var investSpec = new TextField();
    investSpec.Rect = [155.8, 110.64, 17, 6];
    investSpec.DA = null;
    doc.addField(investSpec);
    var lawSpec = new TextField();
    lawSpec.Rect = [142.3, 115.36, 29.4, 6];
    lawSpec.DA = null;
    doc.addField(lawSpec);
    var medSpec = new TextField();
    medSpec.Rect = [150, 120.08, 22, 6];
    medSpec.DA = null;
    doc.addField(medSpec);
    var occultSpec = new TextField();
    occultSpec.Rect = [146, 124.80, 26.4, 6];
    occultSpec.DA = null;
    doc.addField(occultSpec);
    var polSpec = new TextField();
    polSpec.Rect = [147.12, 129.52, 25.6, 6];
    polSpec.DA = null;
    doc.addField(polSpec);
    var scienceSpec = new TextField();
    scienceSpec.Rect = [147.12, 134.24, 25.6, 6];
    scienceSpec.DA = null;
    doc.addField(scienceSpec);
    var techSpec = new TextField();
    techSpec.Rect = [154, 138.97, 18.6, 6];
    techSpec.DA = null;
    doc.addField(techSpec);
  }

  function addVirtueText(doc){
    var conscienceBox = new TextField();
    conscienceBox.Rect = [169, 162.39,  4.4, 6];
    conscienceBox.DA = null;
    doc.addField(conscienceBox);
    var selfControlBox = new TextField();
    selfControlBox.Rect = [166.3, 171.83, 6.8, 6];
    selfControlBox.DA = null;
    doc.addField(selfControlBox);
    var courageBox = new TextField();
    courageBox.Rect = [148.5, 181.27, 24.4, 6];
    courageBox.DA = null;
    doc.addField(courageBox);
  }

  function addMeritBoxes(meritPos, meritHeight, doc){
    for(var i = 0; i < 5; i++){
      var meritBox = new TextField();
      meritBox.Rect = [meritPos, meritHeight, 44, 6];
      meritBox.DA = null;
      doc.addField(meritBox);
      var meritPtBox = new TextField();
      meritPtBox.Rect = [meritPos + 45.575, meritHeight, 6, 6];
      meritPtBox.DA = null;
      meritPtBox.Q = 1;
      doc.addField(meritPtBox);
      meritHeight += 4.7095;
      if(MeritFlawService.masterMeritList[i] != null){
        meritBox.V = MeritFlawService.masterMeritList[i].name;
        meritPtBox.V = "" + MeritFlawService.masterMeritList[i].pointCost;
      }
    }
  }

  function addFlawBoxes(flawPos, flawHeight, doc){
    for(var i = 0; i < 5; i++){
      var flawBox = new TextField();
      flawBox.Rect = [flawPos, flawHeight, 44, 6];
      flawBox.DA = null;
      doc.addField(flawBox);
      var flawPtBox = new TextField();
      flawPtBox.Rect = [flawPos + 45.575, flawHeight, 6, 6];
      flawPtBox.DA = null;
      flawPtBox.Q = 1;
      doc.addField(flawPtBox);
      flawHeight += 4.7095;
      if(MeritFlawService.masterFlawList[i] != null){
        flawBox.V = MeritFlawService.masterFlawList[i].name;
        flawPtBox.V = "" + MeritFlawService.masterFlawList[i].pointCost;
      }
    }
  }

  function addPathBoxes(pathPos, pathHeight, doc){
    var pathText = new TextField();
    pathText.Rect = [pathPos, pathHeight, 40, 6];
    pathText.DA = null;
    pathText.V = PathService.selectedPath.name;
    doc.addField(pathText);
    var bearingBox = new TextField();
    bearingBox.Rect = [pathPos + 12, pathHeight + 9.4, 21, 5];
    bearingBox.DA = null;
    doc.addField(bearingBox);
    var bearingValBox = new TextField();
    bearingValBox.Rect = [pathPos + 34.5, pathHeight + 9.4, 5.3, 5];
    bearingValBox.DA = null;
    doc.addField(bearingValBox);
  }

  // function addCustomDots(dotPos, dotHeight, doc){
  //   for(var i = 0; i < 3; i++){
  //     for(var j = 0; j < 5; j++){
  //       var circle = new CheckCircle();
  //       circle.Rect = [dotPos, dotHeight, 5, 5];
  //       circle.V = "/Off";
  //       circle.AS = "/Off";
  //       doc.addField(circle);
  //       dotPos += 2.83;
  //     }
  //     dotPos += 43.075;
  //   }
  // }

  function drawPoints(attribute, position, height, doc){
    for(point in attribute.points){
      if(attribute.points[point].type != ""){
        doc.circle(position, height, 1.28, 'FD');
        position += 2.87;
      }
    }
  }

  function drawPath(attr, position, height, doc){
    for(point in attr.points){
      if(attr.points[point].type != ""){
        doc.circle(position, height, 1.5, 'FD');
        position += 4.2;
      }
    }
  }

  function createWillPoints(position, height, doc){
    for(point in WillpowerService.willpower.points){
      var circle = new CheckCircle();
      circle.Rect = [position, height, 5, 5];
      if(WillpowerService.willpower.points[point].type == ""){
        circle.V = "/Off";
        circle.AS = "/Off";
      }
      var willBox = new FillBox();
      willBox.Rect = [position+1, height + 5.15, 3, 3];
      doc.addField(willBox);
      doc.addField(circle);
      position += 4.23;
    }
  }

  function createBloodBoxes(position, height, doc){
    var bloodText = new TextField();
    bloodText.Rect = [position + 27, height + 7.5, 10, 5];
    bloodText.DA = null;
    doc.addField(bloodText);
    var bloodBoxPos = position;
    for(var i = 0; i < 20; i++){
      var bloodBox = new FillBox();
      bloodBox.Rect = [bloodBoxPos, height, 3, 3];
      doc.addField(bloodBox);
      if(i == 9){
        height += 4.33;
        bloodBoxPos = position;
      }
      else
        bloodBoxPos += 4.23;
    }
  }

  function createHealthBoxes(position, height, doc){
    for(var i = 0; i < 7; i++){
      var healthBox = new EditBox();
      healthBox.Rect = [position, height, 9, 4];
      healthBox.TI = 1;
      healthBox.Opt = '[(/)(X)(*)]';
      doc.addField(healthBox);
      height += 4.976;
    }
  }

  function createWeaknessBox(position, height, doc){
    var weaknessBox = new TextField();
    weaknessBox.Rect = [position, height, 46, 10];
    weaknessBox.DA = null;
    weaknessBox.multiline = true;
    doc.addField(weaknessBox);
  }

  function createExpBox(position, height, doc){
    var expBox = new TextField();
    expBox.Rect = [position, height, 46, 10];
    expBox.DA = null;
    expBox.multiline = true;
    doc.addField(expBox);
  }

}]);
