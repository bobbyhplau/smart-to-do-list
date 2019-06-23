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
      //const tags = ['<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">']
      //tags.push('<li class="mb-1">')
      const tags = ['<li class="list-group-item non-title">'];
      tags.push('<div class="leftsideoftext">');
      tags.push('<i class="far fa-square"></i>');
      tags.push(item.text)
      tags.push('</div><div class="toolbar">');
      tags.push('<i class="far fa-edit"></i>');
      tags.push('<i class="fas fa-exchange-alt"></i>');
      tags.push('<i class="fas fa-trash-alt"></i>');
      tags.push('</div>');
      tags.push('</li>')
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
