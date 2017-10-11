var app = angular.module("site");
app.service('PdfService',
['$http', 'CharCreatorService', 'ClanService',
function($http, CharCreatorService, ClanService){

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

    doc.text(33, 41.8, CharCreatorService.charName);
    doc.text(91.5, 41.8, CharCreatorService.charNature);
    doc.text(144.7, 41.8, ClanService.selectedClan.name);
    doc.text(34.1, 47.6, CharCreatorService.charPlayer);
    doc.text(97.2, 47.6, CharCreatorService.charDemeanor);
    doc.text(155.8, 47.6, CharCreatorService.charGeneration);

    doc.save("character_sheet.pdf");
  }

}]);
