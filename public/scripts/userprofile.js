const drawDisplayName = function() {
  $('.userGreeting').text(`Welcome back, ${Cookies.get('displayname')}!`);
  $('.userName').text(`${Cookies.get('displayname')}`);
}

const drawAvatar = function() {
  $('.userIcon').attr('src', `${Cookies.get('displaypic')}`);
  $('.userAvatar').attr('src', `${Cookies.get('displaypic')}`);
  $('#inputLarge2').val(`${Cookies.get('displaypic')}`);
}

$(() => {
  drawDisplayName();
  drawAvatar();

  //clicking the nav-bar button collapses then hides the nav-bar
  $('.navbar-toggler').on('click', function(event) {
    let windo = $('.navbar-collapse');
    event.preventDefault();
    if (windo.css('display') === 'none') {
      windo.slideDown('fast');
    } else {
      windo.slideUp('fast');
    }
  });

  $('#change-username').unbind().on('click', function(event) {
    event.preventDefault();
    let input = $('#inputLarge').serialize();
    const uid = Cookies.get('userID');

    input = input.substring(12, input.length);

    $.ajax({
      url: `${uid}/newDisplayName/${input}`,
      type: 'PUT'
    }).then(function() {
      drawDisplayName();
      $('#inputLarge').val("");
    });
  });

  $('#change-avatar').unbind().on('click', function(event) {
    event.preventDefault();
    let input = $('#inputLarge2').serialize();
    const uid = Cookies.get('userID');

    input = input.substring(11, input.length);

    $.ajax({
      url: `${uid}/newDisplayPic/${input}`,
      type: 'PUT'
    }).then(function() {
      drawAvatar();
    });
  });

});
