const populateTweet = (tweet) => {
  const { user, content, created_at } = tweet;
  let tweetContainer = $(`
  <article class="tweet">
    <header class="tweet-header">
      <span class="header-left-span">
        <img src="${user.avatars}">
        <span>${user.name}</span>
      </span>
      <span class="handle">${user.handle}</span>
    </header>
    <div>${escape(content.text)}</div>
    <footer class="tweet-footer">
      <span>${timeago.format(created_at)}</span>
      <span class="footer-right-span">
        <i class="icon icon-color fa-solid fa-flag"></i>
        <i class="icon icon-color fa-solid fa-heart"></i>
        <i class="icon icon-color fa-solid fa-retweet"></i>
      </span>
    </footer>
  </article>`);
  return tweetContainer;
}; 


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const loadTweetsAJAX = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
    .then((result) => {callback(result)})
};


const submitTweetAJAX = () => {
  const tweetForm = $('#tweet-form');
  tweetForm.on('submit', function (event) {
    event.preventDefault();
    //test edge cases
    const tweetText = $('.tweet-text').val();
    const errorSpan = $('.error').hide('fast');
    
    if(tweetText.length > maxTweetLength) {
      errorSpan.text('This tweeeeet is toooo loooong...');
      errorSpan.slideDown('fast');
      return;
    }
    if(!tweetText) {
      errorSpan.text('Silence is a statment unto itself (tweet is empty or invalid)');
      errorSpan.slideDown('fast');
      return;
    }

    const serializedData = $(this).serialize();
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: serializedData
    })
    .then(() => {
      loadTweetsAJAX((results) => {
        const newestTweet = [results.pop()];
        $('.tweet-text').val('');
        $('#counter').text(140);
        renderTweets(newestTweet);
      })
    })
  });
};


const renderTweets = (tweetDB) => {
  for (let tweet of tweetDB) {
    $('.old-tweets').prepend(populateTweet(tweet));
  };
}


$(document).ready(() => {
  submitTweetAJAX();
  loadTweetsAJAX(renderTweets);
});