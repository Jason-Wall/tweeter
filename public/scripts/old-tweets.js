$(document).ready(() => {

  const populateOldTweets = () => {
    const container = $('<div>').addClass('tweet');

    //header:
    const header = $('<header>').addClass('tweet-header');
    const headerLeftSpan = $('<span>');
    const avatar = $('<i>').addClass('avatar fa-solid fa-skull');
    const userName = $('<span>').text('username');
    const handle = $('<span>').text('handle');
    headerLeftSpan.append(avatar, userName);
    header.append(headerLeftSpan, handle);

    //tweet-text:
    const tweetText = $('<article>').addClass('tweet-text').text('this is a tweet');

    //footer:
    const footer = $('<footer>').addClass('tweet-footer');
    const dateSpan = $('<span>').text('date');
    const footerRightSpan = $('<span>');
    const iconflag = $('<i>').addClass('icon-color fa-solid fa-flag');
    const iconretweet = $('<i>').addClass('icon-color fa-solid fa-retweet');
    const iconheart = $('<i>').addClass('icon-color fa-solid fa-heart');

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

  $('.old-tweets').append(populateOldTweets());

});

