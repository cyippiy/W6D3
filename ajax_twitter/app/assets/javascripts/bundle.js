/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/twitter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/api_util.js":
/*!******************************!*\
  !*** ./frontend/api_util.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

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


/***/ }),

/***/ "./frontend/follow_toggle.js":
/*!***********************************!*\
  !*** ./frontend/follow_toggle.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");


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


/***/ }),

/***/ "./frontend/tweet_compose.js":
/*!***********************************!*\
  !*** ./frontend/tweet_compose.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");

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


/***/ }),

/***/ "./frontend/twitter.js":
/*!*****************************!*\
  !*** ./frontend/twitter.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");
const UsersSearch = __webpack_require__(/*! ./users_search.js */ "./frontend/users_search.js");
const TweetCompose = __webpack_require__(/*! ./tweet_compose.js */ "./frontend/tweet_compose.js");

$(() => {
  const followToggle = new FollowToggle($('.follow-toggle'));
  const usersSearch = new UsersSearch($('.users-search'));
  const tweetCompose = new TweetCompose($('.tweet-compose'));
});


/***/ }),

/***/ "./frontend/users_search.js":
/*!**********************************!*\
  !*** ./frontend/users_search.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(/*! ./api_util.js */ "./frontend/api_util.js");
const FollowToggle = __webpack_require__(/*! ./follow_toggle.js */ "./frontend/follow_toggle.js");

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


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map