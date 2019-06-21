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
    todo.forEach(function(item) {
      const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      tags.push('<li class="mb-1">')
      tags.push(item.text)
      tags.push('</li>')
      tags.push('</a>')
      $("#toWatch").append(tags.join(""))
    });
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todo"
  }).done((todo) => {
    todo.forEach(function(item) {
      const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      tags.push('<li class="mb-1">')
      tags.push(item.text)
      tags.push('</li>')
      tags.push('</a>')
      $("#toRead").append(tags.join(""))
    });
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todo"
  }).done((todo) => {
    todo.forEach(function(item) {
      const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      tags.push('<li class="mb-1">')
      tags.push(item.text)
      tags.push('</li>')
      tags.push('</a>')
      $("#toBuy").append(tags.join(""))
    });
  });
});

$(() => {
  $.ajax({
    method: "GET",
    url: "/api/todo"
  }).done((todo) => {
    todo.forEach(function(item) {
      const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      tags.push('<li class="mb-1">')
      tags.push(item.text)
      tags.push('</li>')
      tags.push('</a>')
      $("#toEat").append(tags.join(""))
    });
  });
});