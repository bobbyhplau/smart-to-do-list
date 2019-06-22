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
    url: "/api/todos",
    data: {
      category
    }
  }).done((todos) => {
    console.log(todos);
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
const populateCategories = () => {
  populateCategory('movie', '#toWatch');
  populateCategory('restaurant', '#toEat');
  populateCategory('book', '#toRead');
  populateCategory('products', '#toBuy');
}

$(() => {
  // bring up the todo lists
  populateCategories();

  // clicking the submit button adds a new todo list
  $('#todo-maker-button').unbind().on('click', function(event) {
    event.preventDefault();
    const input = $('#inputLarge').serialize();

    $.post('/api/todos', input).then(function() {
      $('#inputLarge').val('');
      clearCategories();
      populateCategories();
    });
  });

  //clicking logout will log me out
  $('#log-out-nav').unbind().on('click', function(event) {
    event.preventDefault();
    $.post('api/users/logout').then(function() {
      window.location = 'login';
    });
  });

});
