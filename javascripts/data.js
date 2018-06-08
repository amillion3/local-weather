const events = require('./events');
const apiKeys = require('./apiKeys');
const dom = require('./dom');

const init = () => {
  events.bindEvents();
  apiKeys.retrieveKeys();
  dom.randomBackgroundLogin();
};

module.exports = {
  init,
};
