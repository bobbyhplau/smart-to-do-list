const categorize = require('./smart-search.js').categorize;

const chooseCategory = function(str) {

  const obj = categorize(str);

  if (obj.isMovie) {
    return "movie";
  } else if (obj.isBook) {
    return "book";
  } else if (obj.isRestaurant) {
    return "restaurant";
  } else {
    return "products";
  }
}

module.exports.chooseCategory = chooseCategory;
