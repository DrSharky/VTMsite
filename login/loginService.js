var app = angular.module("site");

app.service("LoginService", ['$firebaseObject', '$firebaseAuth',
 function($firebaseObject, $firebaseAuth){

   this.wait = wait;

   function wait(){
     return $firebaseAuth().$waitForSignIn();
   }

   this.loggedIn = loggedIn;

   function loggedIn(){
     setTimeout(function(){
       var data = $firebaseAuth().$getAuth();
       if(data){
         return true;
       }
       else{
         return false;
       }
     }, 500);
   }

  // function loggedIn(){
  //   var user = $firebaseAuth().$getAuth();
  //   if(user != null)
  //     return true;
  //   else
  //     return false;
  // }
}]);
