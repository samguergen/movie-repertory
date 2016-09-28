angular
    .module('movieApp', [])
    .service('SortService', ['$log', function ($log) {

        return {
            sort: function() {

            }
        };

    }])
    .controller('MovieCtrl', ['$scope', '$location', '$http', '$window', 'SortService', function($scope, $location, $http, $window, SortService){
      console.log('init main ng controller');

      $http.get('movies.json').then(function(data) {

        $scope.movies = data.data
      }, function(error) {
        console.log("The movie list could not be loaded. Error Details: ", error);
      });

      $scope.sortList = SortService;
      // $scope.sortList = SortService.sort;

      $scope.addToList = function(){
        $scope.movies.push($scope.newMovie);
        $scope.newMovie = {};
        console.log('movies are ', $scope.movies);
      }

}])