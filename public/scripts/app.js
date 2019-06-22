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

const populateCategory = (category, containerID) => {
  $.ajax({
    method: "GET",
    url: "/api/todo",
    data: {
      category
    }
  }).done((todos) => {
    todos.forEach(function(item) {
      const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      tags.push('<li class="mb-1">')
      tags.push(item.text)
      tags.push('</li>')
      tags.push('</a>')
      $(containerID).append(tags.join(""))
    });
  });
};
const clearCategories = () => {
  $('#toWatch').empty();
  $('#toRead').empty();
  $('#toBuy').empty();
  $('#toEat').empty();
};

$(() => {
  populateCategory('movie', '#toWatch')
  populateCategory('restaurant', '#toEat')
  populateCategory('book', '#toRead')
  populateCategory('products', '#toBuy')

  $('#todo-maker-button').on('click', function(event) {
    event.preventDefault();
    const input = $('#inputLarge').serialize();

    $.post('/api/todos', input).then(function() {
      clearCategories();
      populateCategory('movie', '#toWatch');
      populateCategory('restaurant', '#toEat');
      populateCategory('book', '#toRead');
      populateCategory('products', '#toBuy');
    });
  });
});
