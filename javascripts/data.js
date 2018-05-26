const events = require('./events');
const apiKeys = require('./apiKeys');
const dataGK = require('./dataGatekeeper');

const init = () => {
  dataGK.setKey(apiKeys.retrieveKeys());
  console.error('init', apiKeys.retrieveKeys());
  events.bindEvents();
};

module.exports = {
  init,
};
