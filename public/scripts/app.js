// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for (const user of users) {
//       $("<div>").text(user.displayname).appendTo($("body"));
//     }
//   });
// });

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todo"
  }).done((todo) => {
    for (const text of todo) {
    $("#toWatch").text(todo.text).appendTo($("<a>"));
    }
  });
});