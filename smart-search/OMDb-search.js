require('dotenv').config({ path: '../.env' });

const omdbApi = require('omdb-client');
const args = process.argv.slice(2).join(' ');

const toWatch = function(args) {
  var params = {
    apiKey: process.env.OMDb_API_Key,
    title: args
  }

  omdbApi.get(params, function(err, data) {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('To Watch?: ', data);
    }
  });
}

toWatch(args);
