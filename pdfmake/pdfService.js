var app = angular.module("site");

app.factory("PdfService", [function(){
  if(pdfMake){
    return pdfMake;
  }
}]);
