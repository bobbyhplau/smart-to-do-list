const toRead = require('./goodreads-search.js').toRead;
const toWatch = require('./OMDb-search.js').toWatch;
const toEat = require('./food-search.js').toEat;

const categorize = function(todo) {
  var promise1 = toRead(todo);
  var promise2 = toWatch(todo);
  var promise3 = toEat(todo);

  return Promise.all([promise1, promise2, promise3])
    .then(function(values) {

      let obj = {};
      if (!values.includes(true)) {
        obj.isProduct = true;
      } else {
        obj.isProduct = false;
      }
      obj.isBook = values[0];
      obj.isMovie = values[1];
      obj.isRestaurant = values[2];

      if (obj.isMovie) {
        return "movie";
      } else if (obj.isBook) {
        return "book";
      } else if (obj.isRestaurant) {
        return "restaurant";
      } else {
        return "products";
      }
    }).catch(function(error) {
      console.log('error:', error);
    });
}

module.exports.categorize = categorize;
