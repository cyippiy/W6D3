const APIUtil = {
  followUser: id => {
    // ...
    return $.ajax({
      method: 'POST',
      url: `${id}/follow`,
      data: {
        user_id: id
      },
      dataType: 'JSON'
    });
  },

  unfollowUser: id => {
    // ...
    return $.ajax({
      method: 'DELETE',
      url: `${id}/follow`
    });
  },

  searchUsers: (queryVal, success) => {
    return $.ajax({
      method: 'GET',
      url: `search?query=${queryVal}`,
      dataType: 'JSON'
    });
  },

  createTweet: (data) => {
    // ...
    return $.ajax({
      method: 'POST',
      url: `tweets`,
      tweet: {
        content: data.content,
        mentioned_user_ids: data.mentioned_user_ids
      },
      dataType: 'JSON'
    });
  }

};

module.exports = APIUtil;
