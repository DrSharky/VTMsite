var app = angular.module("site");
app.controller("RegisterController",[ '$scope', '$firebaseObject', '$firebaseAuth',
 function ($scope, $firebaseObject, $firebaseAuth) {
   this.email = "";
   this.password = "";
   this.register = register;
   function register(){
     firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       // ...
    });
  }
}]);
