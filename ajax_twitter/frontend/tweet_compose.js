const APIUtil = require('./api_util.js');

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    this.$el.on('submit', (e) => this.submit.bind(this, e)());
  }

  submit(e) {
    e.preventDefault();
    const data = {};
    data.content = this.$el.find('textarea').val();
    data.mentioned_user_ids = this.$el.find('select').val();
    APIUtil.createTweet(data).then ((res) => alert(res), () => alert(2));
  }
}
module.exports = TweetCompose;
