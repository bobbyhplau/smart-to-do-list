'user strict';

require('dotenv');

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

const stringSimilarity = require('string-similarity');

const toEat = function(query) {
  return new Promise(function(resolve, reject) {
    client.search({
      term: query,
      location: 'vancouver, bc',
      categories: 'restaurants',
      limit: 1,
      radius: 32000
    }).then(response => {
      const match = response.jsonBody.businesses;
      if (match[0] === undefined) {
        resolve(false);
      } else if (match[0].name.includes(query)) {
        resolve(true);
      } else if (stringSimilarity.compareTwoStrings(match[0].name, query) >= 0.70) {
        resolve(true);
      } else {
        resolve(false);
      }
    }).catch(e => {
      resolve(false);
    });
  })
}
module.exports.toEat = toEat;
