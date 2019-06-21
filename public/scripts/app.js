import 'bootstrap';

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (const user of users) {
      $("<div>").text(user.displayname).appendTo($("body"));
    }
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todo"
  }).done((todo) => {
    $("#toWatch").text(todo.category).appendTo($("toWatchList"));
  });
});