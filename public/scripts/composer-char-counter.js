$(document).ready(function() {
  
  $('#tweet-text').on('input', function() {
    const charactersRemaining = maxTweetLength - $(this).val().length;
    $('#counter').text(charactersRemaining);
    if (charactersRemaining<0) {
      $('#counter').addClass('red')
    } else {
      $('#counter').removeClass('red')
    }
  });
});