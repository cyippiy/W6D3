const FollowToggle = require('./follow_toggle.js');
const UsersSearch = require('./users_search.js');

$(() => {
  const followToggle = new FollowToggle($('.follow-toggle'));
  const usersSearch = new UsersSearch($('.users-search'));
});
