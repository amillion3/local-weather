const events = require('./events');
const apiKeys = require('./apiKeys');

const init = () => {
  events.bindEvents();
  apiKeys.retrieveKeys();
};

module.exports = {
  init,
};
