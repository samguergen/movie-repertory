angular.module('movieApp')
  .controller('MovieCtrl', ['$scope', '$location', '$http', '$window', 'SortService', function($scope, $location, $http, $window, SortService){

      $http.get('movies.json').then(function(data) {
        $scope.moviez = SortService.movies(data.data);

      }, function(error) {
        console.log("The movie list could not be loaded. Error Details: ", error);
      });

      $scope.reverted = true;

      $scope.sortList = function(sortBy){
        return SortService.sortList(sortBy, $scope.reverted);
      }

      $scope.addToList = function(){
        $scope.movies.push($scope.newMovie);
        $scope.newMovie = {};
      }

}])