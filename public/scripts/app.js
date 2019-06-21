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
<<<<<<< HEAD
    $("#toWatch").text(todo.category).appendTo($("<a>"));
=======
    for (const text of todo) {
    $("#toWatch").text(todo.text).appendTo($("<a>"));
    }
>>>>>>> c4b325e4cee5ee33cdf8592727888f61ff996648
  });
});