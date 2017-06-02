var app = angular.module("site");

app.service("LoginService", ['$firebaseObject', '$firebaseAuth',
 function($firebaseObject, $firebaseAuth){

  this.loggedIn = loggedIn;

  function loggedIn(){
    var user = firebase.auth().currentUser;
    if(user != null)
      return true;
    else
      return false;
  }
}]);
