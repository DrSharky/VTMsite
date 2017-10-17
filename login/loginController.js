var app = angular.module("site");
app.controller("LoginController",
['$firebaseObject', '$firebaseAuth', 'LoginService', '$scope', '$window',
 function ($firebaseObject, $firebaseAuth, LoginService, $scope, $window) {
   this.email = "";
   this.password = "";
   this.registered = false;
   this.loggedIn = LoginService.loggedIn();
  //  this.noCloseLogout = false;

   this.register = register;
   this.login = login;
   this.logout = logout;
   this.forgotPW = forgotPW;
  //  this.ifKeepLogin = ifKeepLogin;

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
    firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(function(){
      $window.location.reload();
      self.loggedIn = true;
      $("#DDList").removeClass("open");
    })
    .catch(function(error){
      alert(error.message);
    });
  }

  function forgotPW(email){
    LoginService.forgotPW(email);
  }

  function logout(){
    firebase.auth().signOut().catch(function(error){
      alert(error.message);
    });
    this.loggedIn = false;
  }

  // $window.onunload = ifKeepLogin;
  // function ifKeepLogin(){
  //   if(!self.noCloseLogout){
  //     self.logout();
  //   }
  // }
}]);
