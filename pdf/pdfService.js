var app = angular.module("site");
app.service('PdfService',
['$http', 'CharCreatorService', 'ClanService', 'AttributesService',
function($http, CharCreatorService, ClanService, AttributesService){

  this.imgData = "";
  this.generatePDF = generatePDF;

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

    doc.setDrawColor(0);
    doc.setFillColor(0);
    var strengthPosition = 59.74;
    doc.circle(strengthPosition, 71.52, 1.28, 'FD');

    for(var strengthPoint in AttributesService.strength.points){
      if(AttributesService.strength.points[strengthPoint].id ||
         AttributesService.strength.points[strengthPoint].type == ""){
        strengthPosition += 2.87;
        if(AttributesService.strength.points[strengthPoint].type == "original"){
          doc.setDrawColor(0);
          doc.setFillColor(0);
          doc.circle(strengthPosition, 71.52, 1.28, 'FD');
        }
        else if(AttributesService.strength.points[strengthPoint].type == "freebie"){
          doc.setDrawColor(187, 0, 0);
          doc.setFillColor(187, 0, 0);
          doc.circle(strengthPosition, 71.52, 1.28, 'FD');
        }
      }
    }

    doc.save("character_sheet.pdf");
  }

}]);
