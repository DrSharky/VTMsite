var app = angular.module("site");

app.service("UploadService", ['CharCreatorService', 'LoginService', '$firebaseStorage',
function(CharCreatorService, LoginService, $firebaseStorage){

  this.uid = LoginService.getUID();
  
  //TODO: Check if character exists and has an image.
  //then give a prompt to overwrite if true.
  this.uploadImage = uploadImage;
  function uploadImage(image){
    var charName = CharCreatorService.charName;

    //Split this to parse the binary and image type.
    var imageBinary = image.split(/[,:;]+/);
    //Get the file extension.
    var fileType = "." + imageBinary[1].split("/")[1];
    //If it's a jpeg, switch the ext to jpg.
    if(fileType == ".jpeg"){fileType = ".jpg";}
    //Get the reference now that we have everything we need.
    var storageRef = firebase.storage().ref("images/" + this.uid
                     + "/" + charName + fileType);

    var storage = $firebaseStorage(storageRef);
    //Input the image file as base64 binary into firebase storage.
    storage.$putString(imageBinary[3], "base64", {contentType: imageBinary[1]});
  };

  this.removeImage = removeImage;
  function removeImage(){
    console.log("UploadService.removeImage() not implemented");
  };

  this.loadImage = loadImage;
  function loadImage(){
    console.log("UploadService.loadImage() not implemented");
  };

}]);
