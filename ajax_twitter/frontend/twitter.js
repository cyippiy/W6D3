const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');
const TweetCompose = require('./tweet_compose.js');

$(() => {
  const followToggle = new FollowToggle($('.follow-toggle'));
  const usersSearch = new UsersSearch($('.users-search'));
  const tweetCompose = new TweetCompose($('.tweet-compose'));
});
