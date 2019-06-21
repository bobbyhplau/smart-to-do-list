require('dotenv').config({ path: '../.env' });

const args = process.argv.slice(2).join(' ');
const { google } = require('googleapis');

const books = google.books({
  version: 'v1',
  auth: process.env.Google_API_Key
})

const params = {
  q: args,
  maxResults: 5,
  printType: 'books',
  projection: 'lite',
  fields: 'items(title)'
}

books.volumes.list(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  for (let result of res.data.items) {
    console.log(result.volumeInfo.title);
  }
})
