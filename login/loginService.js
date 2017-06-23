var app = angular.module("site");
app.service("LoginService", ['$firebaseObject', '$firebaseAuth',
 function($firebaseObject, $firebaseAuth){

   this.loggedIn = loggedIn;
   function loggedIn(){
       var data = $firebaseAuth().$getAuth();
       if(data){
         return true;
       }
       else{
         return false;
       }
   }

   this.getUID = getUID;
   function getUID(){
     var data = $firebaseAuth().$getAuth();
     if(data){
       return data.uid;
     }
     else{
       return null;
     }
   }

   this.forgotPW = forgotPW;
   function forgotPW(email){
     firebase.auth().sendPasswordResetEmail(email);
     alert("Password Reset Email Sent!");
   }
 }]);
