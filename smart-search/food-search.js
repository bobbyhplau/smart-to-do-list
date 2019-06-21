'user strict';

require('dotenv').config({ path: '../.env' });

console.log('----------------------', process.env.Yelp_API_Key);
const args = process.argv.slice(2).join(' ');

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.Yelp_API_Key);

client.search({
  term: args,
  location: 'vancouver, bc',
  categories: 'restaurants',
  limit: 1
}).then(response => {
  console.log(response.jsonBody.businesses[0].name);
}).catch(e => {
  console.log(e);
});
