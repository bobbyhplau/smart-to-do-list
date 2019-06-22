$(() => {

  //clicking the nav-bar button collapses then hides the nav-bar
  $('.navbar-toggler').on('click', function(event) {
    let windo = $('.navbar-collapse');
    event.preventDefault();
    console.log('hello-world');
    if (windo.css('display') === 'none') {
      windo.slideDown('fast');
    } else {
      windo.slideUp('fast');
    }
  });

  //clicking login will give me a userid of 1 temp
  $('#log-in-nav').unbind().on('click', function(event) {
    event.preventDefault();
    $.post('/api/users', { email: 'test@test.com' }).then(function() {});
  });
});
