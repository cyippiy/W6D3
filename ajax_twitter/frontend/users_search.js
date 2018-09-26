const APIUtil = require('./api_util.js');
const FollowToggle = require('./follow_toggle.js');

class UsersSearch{
  constructor($el) {
    this.$el = $el;
    this.$input = $el.find(".query");
    this.$ul = $el.find("ul");
    this.$input.on('input', (e) => this.handleInput.bind(this, e)());
  }

  handleInput(e) {
    e.preventDefault();
    APIUtil.searchUsers(this.$input.val()).then((res) => this.render(res), ()=>alert(2));
  }

  render(res) {
    this.$ul.empty();
    let search_arr = [];
    for (var i = 0; i < res.length; i++) {
      this.$ul.append(`<li>${res[i].username}
        <button type="button" class="follow-toggle-${res[i].id}" data-user-id="${res[i].id}"
        data-initial-follow-state="${res[i].followed}"name="button"></button></li>`);
        search_arr.push(new FollowToggle($(`.follow-toggle-${res[i].id}`)));
    }

  }
}

module.exports = UsersSearch;
