var app = angular.module('MovieApp', []);

app.controller('MainController', ['$scope', function($scope) {
 	
 	$scope.movies = [
 		{
 			name: "The Revenant",
 			year: 2015,
 			img: "/img/the-revenant.jpg",
 			description: "A man is left for his death and didnt die"
 		},
 		{
 			name: "Blue Valentine",
 			year: 2010,
 			img: "/img/blue-valentine.jpg",
 			description: "A love story of how two people fall in love and lose that love"
 		},
 		{
 			name: "Leon",
 			year: 1994,
 			img: "/img/leon.jpg",
 			description: "A girl seeks for revenge with a murderer"
 		},
 		{
 			name: "Killing them softly",
 			year: 2012,
 			img: "/img/killing-them-softly.jpg",
 			description: "An investigator works for mobsters"
 		}
 	];
 	localStorage.setItem('movies', $scope.movies);

 	 $scope.addMovie = function(){
  		
     };

     $scope.deleteMovie = function(index){

     };

     $scope.editMovie = function(index){
   
     };


}]);