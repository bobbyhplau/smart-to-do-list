require('dotenv').config({ path: '../.env' });

const omdbApi = require('omdb-client');

const toWatch = function(args) {
  var params = {
    apiKey: process.env.OMDB_API_KEY,
    title: args
  }

  return new Promise(function(resolve, reject) {
    omdbApi.get(params, function(err, data) {
      if (err) {
        resolve(false);
      } else {
        if (Number(data.imdbVotes.replace(/,/g, '')) > 2000) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    });
  });
}

module.exports.toWatch = toWatch;
