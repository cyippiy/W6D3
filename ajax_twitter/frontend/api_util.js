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
  }

};

module.exports = APIUtil;
