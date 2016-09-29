angular.module('movieApp')
  .controller('MovieCtrl', ['$scope', '$location', '$http', '$window', 'SortService', function($scope, $location, $http, $window, SortService){
    $scope.reverted = true; //set initial state for toggle

      //API call to retrieve JSON data
      $http.get('movies.json').then(function(data) {
        $scope.moviez = SortService.movies(data.data); //binds scope to service so that data can be read by both

      }, function(error) {
        console.log("The movie list could not be loaded. Error Details: ", error);
      });

      //binds sort method from service to scope so that it can handle user click
      $scope.sortList = function(sortBy){
        return SortService.sortList(sortBy, $scope.reverted);
      }

      //adds user input to list
      $scope.addToList = function(){
        var titleized = $scope.newMovie.title[0].toUpperCase()+$scope.newMovie.title.slice(1); // titleizes title for consistent sorting
        $scope.moviez.push({
          'title': titleized,
          'year': $scope.newMovie.year
        });
        $scope.newMovie = {};
      }

}])