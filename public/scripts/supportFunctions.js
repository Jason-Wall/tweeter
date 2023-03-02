const submitTweetAJAX = () => {
  const tweetForm = $('#tweet-form');
  tweetForm.on('submit', function(event) {
    event.preventDefault();
    //test edge cases
    const tweetText = $('.tweet-text').val();
    const errorSpan = $('.error').hide('fast');

    if (tweetText.length > maxTweetLength) {
      errorSpan.text('This tweet is too long...');
      errorSpan.slideDown('fast');
      return;
    }
    if (!tweetText) {
      errorSpan.text('Tweet is empty or invalid');
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
        });
      });
  });
};

const loadTweetsAJAX = (callback) => {
  $.ajax({
    method: 'GET',
    url: '/tweets'
  })
    .then((result) => {
      callback(result);
    });
};


const renderTweets = (tweetDB) => {
  for (let tweet of tweetDB) {
    $('.old-tweets').prepend(populateTweet(tweet));
  }
};


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
    <div class="tweet-text">${escapeText(content.text)}</div>
    <footer class="tweet-footer">
      <span>${timeago.format(created_at)}</span>
      <span class="footer-right-span">
        <i class="icon fa-solid fa-flag"></i>
        <i class="icon fa-solid fa-heart"></i>
        <i class="icon fa-solid fa-retweet"></i>
      </span>
    </footer>
  </article>`);
  return tweetContainer;
};


const escapeText = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


const charCounterSetup = () => {
  $('.tweet-text').on('input', function() {
    const charactersRemaining = maxTweetLength - $(this).val().length;
    $('#counter').text(charactersRemaining);
    if (charactersRemaining < 0) {
      $('#counter').addClass('red');
    } else {
      $('#counter').removeClass('red');
    }
  });
};


const navButtonSetup = () => {
  $('.write-new').on('click', () => {
    const newTweet = $('.new-tweet');
    const oldTweets = $('.old-tweets');

    if (newTweet.hasClass('hide')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      newTweet.slideDown(() => {
        newTweet.removeClass('hide');
        $('textarea.tweet-text').focus();
      });
    } else {
      newTweet.slideUp(()=>{
        newTweet.addClass('hide');
      });
    }
  });
};








