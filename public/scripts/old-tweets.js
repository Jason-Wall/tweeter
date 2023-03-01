const oldTweets = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1677460437107
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1677546837107
  }
];


$(document).ready(() => {

  const populateOldTweets = (tweet) => {
    const container = $('<div>').addClass('tweet');

    //header:
    const header = $('<header>').addClass('tweet-header');
    const headerLeftSpan = $('<span>').addClass('header-left-span');
    // const avatar = $('<i>').addClass('avatar fa-solid fa-skull');
    const avatar = $('<a>').attr('href', `${tweet.user.avatars}`);
    const userName = $('<span>').text(`${tweet.user.name}`);
    const handle = $('<span>').text(`${tweet.user.handle}`).addClass('handle');
    headerLeftSpan.append(avatar, userName);
    header.append(headerLeftSpan, handle);

    //tweet-text:
    const tweetText = $('<article>').addClass('tweet-text').text(`${tweet.content.text}`);

    //footer:
    const footer = $('<footer>').addClass('tweet-footer');
    const dateSpan = $('<span>').text(`${tweet.created_at}`);
    const footerRightSpan = $('<span>').addClass('footer-right-span');
    const iconflag = $('<i>').addClass('icon icon-color fa-solid fa-flag');
    const iconretweet = $('<i>').addClass('icon icon-color fa-solid fa-retweet');
    const iconheart = $('<i>').addClass('icon icon-color fa-solid fa-heart');

    footerRightSpan.append(iconflag, iconheart, iconretweet);
    footer.append(dateSpan, footerRightSpan);

    //Full assembly:
    container.append(header, tweetText, footer);

    // Event listeners
    const icons = [iconflag, iconretweet, iconheart];
    for (let icon of icons) {
      icon.on('mouseover mouseout', function () {
        icon.toggleClass('hover-color icon-color');
      });
    };

    return container;
  };
  
  for (let entry of oldTweets) () => {
    console.log(entry);
    $('.old-tweets').append(populateOldTweets(entry));
  };
});

