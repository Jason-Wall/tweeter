// All support functions are available in ./supportFunctions.js.

$(document).ready(() => {
  submitTweetAJAX();
  loadTweetsAJAX(renderTweets);
  charCounterSetup();
  navButtonSetup();
});

