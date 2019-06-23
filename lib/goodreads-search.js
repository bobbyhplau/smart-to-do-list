require('dotenv');

const goodreads = require('goodreads-api-node');
const stringSimilarity = require('string-similarity');

const toRead = function(book) {
  const myCredentials = {
    key: process.env.GR_API_KEY,
    secret: process.env.GR_API_SECRET
  }
  const gr = goodreads(myCredentials);

  const query = {
    q: book,
    page: 1,
    field: 'title'
  }

  return new Promise(function(resolve, reject) {
    let promise = gr.searchBooks(query);

    promise.then(function(result) {

        if (result.search['results-end'] === '0') {
          resolve(false);
        }

        let title = '';
        let ratingsCount = 0;

        if (result.search['results-end'] === '1') {
          title = result.search.results.work.best_book.title;
          ratingsCount = result.search.results.work.ratings_count._;
        } else {
          title = result.search.results.work[0].best_book.title;
          ratingsCount = result.search.results.work[0].ratings_count._;
        }

        // We're taking the title and trying to take away the series identifier
        // Ex: A Game of Thrones (A Song Of Ice and Fire, #1) to A Game of Thrones
        const bracketLocation = title.indexOf('(');
        if (bracketLocation !== -1) {
          title = title.substring(0, title.indexOf("(") - 1);
        }
        const similar = stringSimilarity.compareTwoStrings(title, query.q);
        if (similar >= 0.70 && Number(ratingsCount) > 1000) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      function(err) {
        reject(err);
      });
  });
}

module.exports.toRead = toRead;
