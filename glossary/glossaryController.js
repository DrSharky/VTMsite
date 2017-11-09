var app = angular.module("site");

app.controller("GlossaryController",
['CharCreatorService', '$scope', '$http',
 function(CharCreatorService, $scope, $http){

   this.filterByCategory = filterByCategory;

   var self = this;
   $http.get('');

   function filterByCategory(category){

   };
 }]);