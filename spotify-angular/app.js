// MODULE
var spotifyApp = angular.module('spotifyApp', ['ngRoute', 'ngResource']);


//CONTROLLER
spotifyApp.controller('ctrl', function($scope, $window) {

	$scope.pieces = $window.dataBrowse;

});

spotifyApp.controller('browseController', function($scope, $window) {

	$scope.pieces = $window.dataBrowse;

});

spotifyApp.controller('yourMusicController', function($scope, $window) {

	$scope.pieces = $window.yourMusic;

});


// ROUTES
spotifyApp.config(function ($routeProvider) {
   
    $routeProvider
    
    .when('/', {
        templateUrl: 'pages/browse.htm',
        controller: 'ctrl',
        controllerAs: "app"
    })
    
    .when('/browse', {
        templateUrl: 'pages/browse.htm',
        controller: 'browseController',
        controllerAs: "app"
    })
    
    .when('/your-music', {
        templateUrl: 'pages/your-music.htm',
        controller: 'yourMusicController',
        controllerAs: "app"
    })
    
});


//SEARCH FILTER

spotifyApp.filter('search', function() {

  return function(items, keyword) {
	// In case no keyword is entered, display all items from data.js
    if (!keyword) { 
      return items; 
    } 
	// In case Keyword is enteted, return subset of new items based on said keyword from data.js
    else {
      var newItems = [];
      var keyword = keyword.toLowerCase();
      // create new set of items where 'keyword' exists in object data
      for (var i of items) {
        if (i.title.toLowerCase().indexOf(keyword) > -1 || 
            i.artist.toLowerCase().indexOf(keyword) > -1 || 
            checkDataFile(i.title, keyword)) { newItems.push(i); }
      }
      // loop through the content of data.js, checking if 'keyword' exists
      function checkDataFile(data, keyword) {
        for (var m of data) {
          if (m.toLowerCase().indexOf(keyword) > -1) {
            return true;
          }
        }

        return false;
      }
      return newItems;
    }

  };


});



