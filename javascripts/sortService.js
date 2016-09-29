angular.module('movieApp')
    .service('SortService', function() {

      //data from JSON is accessible through service
      this.movies = function(films){
        this.films = films;
        return this.films;
      }

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

      // sorts movie list by toggling ASC and DESC orders.
      this.sortList = function(sortBy, reverted){
        //sorts initial order in ASC by year or title, passed as user-selected sortBY param to optimize the function
        if (sortBy && reverted) {
          this.films.sort(function(a,b) {
            if (a[sortBy] < b[sortBy])
              return -1;
            if (a[sortBy] > b[sortBy])
              return 1;
            return 0;
          })
        }
        //check if list has already been sorted so that reverse() method can simply be used
        else if (sortBy && !reverted) {
          this.films.reverse();
        }
        else {
          this.shuffle(this.films); //if user selects shuffle btn, then no param passed and send to shuffle function
        }

        return this.films;
      };

    });