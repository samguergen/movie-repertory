angular
    .module('movieApp', [])

    .service('SortService', function() {

      this.movies = function(films){
        console.log('films are ', films);
        this.films = films;
        return this.films;
      }
/*
      this.compare = function(a,b) {
        if (a[this.sortBy] < b[this.sortBy])
          return -1;
        if (a[this.sortBy] > b[this.sortBy])
          return 1;
        return 0;
      }
      */

      //inspired by the Fisher-Yates algorithm
      this.shuffle = function(arr) {
          let count = arr.length;
          while (count > 0) {
              let idx = Math.floor(Math.random() * count);
              count--;
              let temp = arr[count];
              arr[count] = arr[idx];
              arr[idx] = temp;
          }
          return arr;
      }

      this.sortList = function(sortBy, reverted){
        if (sortBy && reverted) {
          this.films.sort(function(a,b) {
            if (a[sortBy] < b[sortBy])
              return -1;
            if (a[sortBy] > b[sortBy])
              return 1;
            return 0;
          })
        }
        else if (sortBy && !reverted) {
          this.films.reverse();
        }
        else {
          this.shuffle(this.films)
        }

        return this.films;
      };
    })

    .controller('MovieCtrl', ['$scope', '$location', '$http', '$window', 'SortService', function($scope, $location, $http, $window, SortService){
      console.log('init main ng controller');

      $http.get('movies.json').then(function(data) {

        $scope.movies = data.data
        $scope.moviez = SortService.movies($scope.movies);
        console.log('mvz are ', $scope.moviez)

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

      $scope.sortMovies = function(sortBy){
        if (sortBy && $scope.reverted) {
          $scope.sortBy = sortBy;
          $scope.movies.sort($scope.compare);
        }
        else if (sortBy && !$scope.reverted) {
          $scope.sortBy = sortBy;
          $scope.movies.reverse();
        }
        else {
          $scope.shuffle($scope.movies)
        }
      }

      $scope.compare = function(a,b) {
        if (a[$scope.sortBy] < b[$scope.sortBy])
          return -1;
        if (a[$scope.sortBy] > b[$scope.sortBy])
          return 1;
        return 0;
      }

      //Fisher-Yates shuffle
      $scope.shuffle = function(arr) {
          let count = arr.length;
          while (count > 0) {
              let idx = Math.floor(Math.random() * count);
              count--;
              let temp = arr[count];
              arr[count] = arr[idx];
              arr[idx] = temp;
          }

          return arr;
      }

}])