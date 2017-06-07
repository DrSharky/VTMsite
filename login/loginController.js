var app = angular.module("site");
app.controller("LoginController",['$firebaseObject', '$firebaseAuth', 'LoginService',
 function ($firebaseObject, $firebaseAuth, LoginService) {
   this.email = "";
   this.password = "";
   this.registered = false;
   this.loggedIn = LoginService.loggedIn();

   this.register = register;
   this.login = login;
   this.logout = logout;

   function register(){
     firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       alert(errorMessage);
       return;
    });
    alert("You are now registered!");
    this.registered = true;
  }
  function login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error){
      alert(error.message);
    });
    this.loggedIn = true;
  }
  function logout(){
    firebase.auth().signOut().catch(function(error){
      alert(error.message);
    });
    this.loggedIn = false;
  }
}]);
