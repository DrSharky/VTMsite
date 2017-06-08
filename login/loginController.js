var app = angular.module("site");
app.controller("LoginController",['$firebaseObject', '$firebaseAuth', 'LoginService', '$scope',
 function ($firebaseObject, $firebaseAuth, LoginService, $scope) {
   this.email = "";
   this.password = "";
   this.registered = false;
   this.loggedIn = LoginService.loggedIn();

   this.register = register;
   this.login = login;
   this.logout = logout;

   var self = this;
   function register(){
     firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(function(){
       alert("You are now registered!");
       var uid = LoginService.getUID();
       self.login();
       self.registered = true;
       self.loggedIn = true;
     }).catch(function(error) {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       alert(errorMessage);
    });
  }

  function login(){
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch(function(error){
      alert(error.message);
    });
    this.loggedIn = true;
    $("#DDList").removeClass("open");
  }

  function logout(){
    firebase.auth().signOut().catch(function(error){
      alert(error.message);
    });
    this.loggedIn = false;
  }
}]);
