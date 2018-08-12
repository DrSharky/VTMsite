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
  this.drawPoints = drawPoints;
  this.drawPath = drawPath;

  var self = this;
  $http.get('./pdf/pdfImage.txt').then(function(response){
    self.imgData = response.data;
  });

  function generatePDF(){
    var doc = new jsPDF();
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(this.imgData, 'JPEG', 0, 0, width, height);
    doc.setFontSize(11);

    AcroForm.Appearance.CheckBox = AcroForm.Appearance.RadioButton.Circle;

    // var test = new CheckBox();
    // test.Rect = [20, 20, 10, 10];
    // test.T = 'Test Check';
    // doc.addField(test);

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
    // doc.text(32.9, 41.8, CharCreatorService.charName);
    var charNature = new TextField();
    charNature.Rect = [91.5, 37.8, 43, 6];
    charNature.V = CharCreatorService.charNature;
    charNature.T = 'CharNature';
    charNature.DA = null;
    doc.addField(charNature);
    // doc.text(91.5, 41.8, CharCreatorService.charNature);
    var charClan = new TextField();
    charClan.Rect = [144.7, 37.8, 43, 6];
    charClan.V = ClanService.selectedClan.name;
    charClan.T = 'CharClan';
    charClan.DA = null;
    doc.addField(charClan);
    // doc.text(144.7, 41.8, ClanService.selectedClan.name);
    var charPlayer = new TextField();
    charPlayer.Rect = [33.1, 44, 42, 6];
    charPlayer.V = CharCreatorService.charPlayer;
    charPlayer.T = 'CharPlayer';
    charPlayer.DA = null;
    doc.addField(charPlayer);
    // doc.text(34.1, 47.7, CharCreatorService.charPlayer);
    var charDemeanor = new TextField();
    charDemeanor.Rect = [95.4, 44, 39, 6];
    charDemeanor.V = CharCreatorService.charDemeanor;
    charDemeanor.T = 'CharDemeanor';
    charDemeanor.DA = null;
    doc.addField(charDemeanor);
    // doc.text(97.2, 47.7, CharCreatorService.charDemeanor);
    doc.text(155.8, 47.7, CharCreatorService.charGeneration);
    doc.text(39.4, 53.5, CharCreatorService.charChronicle);
    doc.text(93.2, 53.5, CharCreatorService.charConcept);
    doc.text(144.1, 53.5, CharCreatorService.charSire);

    var attrRow = 0;
    var attrColumn = 0;
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
      this.drawPoints(Object.values(AbilitiesService.abilitiesList)[i], abPosition, abHeight, doc);
      abHeight += 4.72;
      if(i == 9){
        abPosition += 57.3;
        abHeight = 99.8;
      }
      if(i == 19){
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

    var virtPosition = 173.9;
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

}]);
