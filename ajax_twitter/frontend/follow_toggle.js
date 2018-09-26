const APIUtil = require('./api_util.js');


class FollowToggle {
  constructor($el) {
    this.$el = $el;
    this.user_id = this.$el.attr('data-user-id');
    this.followState = (this.$el.attr('data-initial-follow-state'));
    this.render();
    this.$el.on('click', (e) => this.handleClick.bind(this, e)());
  }

  render() {
    if (this.followState === "true") {
      this.$el.text('Unfollow!');
    } else {
      this.$el.text('Follow!');
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.$el.prop('disabled', true);
    if(this.followState === "true"){
      APIUtil.unfollowUser(this.user_id).then((res) => this.$el.prop('disabled', false), ()=>alert('bad1'));
      this.followState = "false";
    }else{
      APIUtil.followUser(this.user_id).then((res) => this.$el.prop('disabled', false), ()=>alert('bad2'));
      this.followState = "true";
    }

    // this.render.bind(this)();
    this.render();
  }
}





// Make a $.ajax request to POST /users/:id/follow if we are not following the user (check followState), else, it should make a DELETE request.
// On success of the POST/DELETE, we should toggle the followState and re-render.


// const setEventHandlers = () => {
//     $('.follow-toggle').on('click', (e) => {
//       e.preventDefault();
//       const followToggle = new FollowToggle($('.follow-toggle'));
//       // followToggle.render();
//     });
// };
// $(setEventHandlers);




module.exports = FollowToggle;
