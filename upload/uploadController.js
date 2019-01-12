var app = angular.module("site");

app.controller("UploadController", ['UploadService', function(UploadService){

  this.image;

  this.uploadImage = uploadImage;
  function uploadImage(){
    UploadService.uploadImage();
  };

  this.removeImage = removeImage;
  function removeImage(){
    UploadService.removeImage();
  };

}]);
