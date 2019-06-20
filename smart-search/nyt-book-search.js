require('dotenv').config({ path: '../.env' });

const args = process.argv.slice(2).join(' ');

$(() => {
  $.ajax({
    method: "GET",
    url: "https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json",
    data: { "api-key": process.env.NYT_API_Key, 'title': args }
  }).done((result) => {
    console.log(result);
  });
});
