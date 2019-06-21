require('dotenv').config({ path: '../.env' });

const request = require('request');

const args = process.argv.slice(2).join(' ');
/*$(() => {
  $.ajax({
    method: "GET",
    url: "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json",
    data: { "api-key": process.env.NYT_API_Key, 'title': args }
  }).done((result) => {
    console.log(result);
  });
});
*/

const url = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json';
const api_key = `api-key=${process.env.NYT_API_Key}`;
const title = `title=${args.replace(" ", "+")}`;
const params = `?${api_key}&${title}`

console.log(url + params);

request(url + params, function(error, response, body) {
  console.log(body);
});
