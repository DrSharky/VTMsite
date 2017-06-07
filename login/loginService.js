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
 }]);
