const events = require('./events');

const init = () => {
  events.bindEvents();
};

module.exports = {
  init,
};
