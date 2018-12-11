var app = angular.module("site");

app.directive('imageupload',
['UploadService',
function(UploadService){
  return{
    controller: function($scope, UploadService){
      $scope.uploadImage = function(image){
        UploadService.uploadImage(image);
      };
      $scope.removeImage = function(){
        UploadService.removeImage();
      }
    },
    scope:{
      imageUpload: "=?"
    },
    link: function(scope, element, attributes){
      element.bind("change", function(changeEvent){
        var reader = new FileReader();
        reader.onload = function(loadEvent){
          scope.$apply(function(){
            scope.imageUpload = loadEvent.target.result;
            scope.uploadImage(scope.imageUpload);
          });
        }
        reader.readAsDataURL(changeEvent.target.files[0]);
      });
    }
  }
}]);
