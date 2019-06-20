import 'bootstrap';

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for (user of users) {
      $("<div>").text(user.displayname).appendTo($("body"));
    }
  });
});
