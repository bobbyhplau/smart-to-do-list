const toRead = require('./goodreads-search.js').toRead;
const toWatch = require('./OMDb-search.js').toWatch;
const toEat = require('./food-search.js').toEat;

const args = process.argv.slice(2).join(' ');

const categorize = function(todo) {
  var promise1 = toRead(todo);
  var promise2 = toWatch(todo);
  var promise3 = toEat(todo);

  Promise.all([promise1, promise2, promise3])
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
      console.log(obj);
      return obj;
    }).catch(function(error) {
      console.log('error:', error);
    });
}

categorize(args);
