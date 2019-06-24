const populateCategory = (category, containerID) => {
  $.ajax({
    method: "GET",
    url: "/api/todos/notfinished",
    data: {
      category
    }
  }).done((todos) => {
    todos.forEach(function(item) {
      const tags = [`<li class="list-group-item non-title" data-todo-id="${item.id}">`];
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
const populateDoneCategory = (category, containerID) => {
  $.ajax({
    method: "GET",
    url: "/api/todos/finished",
    data: {
      category
    }
  }).done((todos) => {
    todos.forEach(function(item) {
      const tags = [`<li class="list-group-item non-title finished" data-todo-id="${item.id}">`];
      tags.push('<div class="leftsideoftext">');
      tags.push('<i class="far fa-check-square"></i>');
      tags.push(`<strike>${item.text}</strike>`);
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
  populateDoneCategory('movie', '#toWatch');
  populateCategory('restaurant', '#toEat');
  populateDoneCategory('restaurant', '#toEat');
  populateCategory('book', '#toRead');
  populateDoneCategory('book', '#toRead');
  populateCategory('products', '#toBuy');
  populateDoneCategory('products', '#toBuy');
}

const getCategoryBar = function() {
  const bar = ['<i class="fas fa-video"></i>'];
  bar.push('&nbsp&nbsp&nbsp');
  bar.push('<i class="fas fa-utensils"></i>');
  bar.push('&nbsp&nbsp&nbsp');
  bar.push('<i class="fas fa-book"></i>');
  bar.push('&nbsp&nbsp&nbsp');
  bar.push('<i class="fas fa-shopping-cart"></i>');
  return bar.join("");
}

const editCategory = function(event, category) {
  event.preventDefault();
  const tid = $('.tippy-active').parents().parents().attr('data-todo-id');
  $.ajax({
    url: `api/todos/${tid}/toCategory/${category}`,
    type: 'PUT'
  }).then(function() {
    clearCategories();
    populateCategories();
  })
}

$(() => {
  // bring up the todo lists
  populateCategories();

  // clicking the submit button adds a new todo list
  $('#todo-maker-button').unbind().on('click', function(event) {
    event.preventDefault();
    const input = $('#inputLarge').serialize();
    console.log(input);

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

  // complicated code to deal with being able to assign multiple selectors to one parent element
  // I think this is best pracitce for event handlers for dynamically generated elements
  $('.list-group').unbind().on('click',
    '.fa-trash-alt, .fa-square, .fa-edit, .fa-exchange-alt, .fa-check-square',
    function(event) {
      event.preventDefault();
      const tid = $(this).parents().parents().attr('data-todo-id');
      console.log(($(this).attr("class")));
      switch ($(this).attr("class")) {
        case 'fas fa-trash-alt':
          $.ajax({
            url: `api/todos/${tid}`,
            type: 'DELETE'
          }).then(function() {
            clearCategories();
            populateCategories();
          });
          break;
        case 'fas fa-exchange-alt':
          break;
        case 'far fa-edit':
          break;
        case 'far fa-square':
          $.ajax({
            url: `api/todos/${tid}/complete`,
            type: 'PUT'
          }).then(function() {
            clearCategories();
            populateCategories();
          });
          break;
        case 'far fa-check-square':
          $.ajax({
            url: `api/todos/${tid}/notcomplete`,
            type: 'PUT'
          }).then(function() {
            clearCategories();
            populateCategories();
          });
          break;
      }
    });
});

$(document).ajaxStop(function() {
  tippy('.fa-exchange-alt', {
    trigger: 'click',
    content: getCategoryBar(),
    interactive: true,
    onShown: function() {
      $('.fa-video').unbind().on('click', function(event) {
        editCategory(event, "movie");
      });
      $('.fa-utensils').unbind().on('click', function(event) {
        editCategory(event, "restaurant");
      });
      $('.fa-book').unbind().on('click', function(event) {
        editCategory(event, "book");
      });
      $('.fa-shopping-cart').unbind().on('click', function(event) {
        editCategory(event, "products");
      });
    }
  })
})
