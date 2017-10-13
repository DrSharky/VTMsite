var app = angular.module("site");
app.service('PdfService',
['$http', 'CharCreatorService', 'ClanService', 'AttributesService',
 'AbilitiesService', 'DisciplineService', 'BackgroundsService', 'VirtuesService',
 'MeritFlawService',
function($http, CharCreatorService, ClanService, AttributesService,
   AbilitiesService, DisciplineService, BackgroundsService, VirtuesService,
   MeritFlawService){

  this.imgData = "";
  this.generatePDF = generatePDF;
  this.drawPoints = drawPoints;

  var self = this;
  $http.get('./pdf/pdfImage.txt').then(function(response){
    self.imgData = response.data;
  });

  function generatePDF(){
    var doc = new jsPDF();
    var width = doc.internal.pageSize.width;
    var height = doc.internal.pageSize.height;

    doc.addImage(this.imgData, 'JPEG', 0, 0, width, height);
    doc.setFontSize(11);

    doc.text(32.9, 41.8, CharCreatorService.charName);
    doc.text(91.5, 41.8, CharCreatorService.charNature);
    doc.text(144.7, 41.8, ClanService.selectedClan.name);
    doc.text(34.1, 47.7, CharCreatorService.charPlayer);
    doc.text(97.2, 47.7, CharCreatorService.charDemeanor);
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

    var meritPosition = 59.74;
    var meritHeight = 167.2;
    for(var i = 0; i < 1; i++){
      var test = 1;
    }

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

  function drawAbility(ability, position, height, doc){
    for(point in ability.points){
      if(ability.points[point].type != ""){
        doc.circle(position, height, 1.28, 'FD');
        position += 2.87;
      }
    }
  }

}]);
