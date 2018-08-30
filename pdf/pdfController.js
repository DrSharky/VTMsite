var app = angular.module("site");

app.controller("PdfController", ["PdfService",
function(PdfService){

  this.generatePDF = generatePDF;
  function generatePDF(){
    return PdfService.generatePDF();
  }

  this.generateInteractivePDF = generateInteractivePDF;
  function generateInteractivePDF(){
    return PdfService.generateInteractivePDF();
  }

  this.generateLongPDF = generateLongPDF;
  function generateLongPDF(){
    return PdfService.generateLongPDF();
  }

}])
