const dataGK = require('./dataGatekeeper');
const apiKeys = require('./apiKeys');

let key = '';
let zip = '';

const getZipcode = () => {
  zip = dataGK.getZipcode();
};

const makeAPIRequest = () => {
  zip = dataGK.getZipcode();
  key = apiKeys.apiKey();
  // make API call promise next
};

module.exports = {
  makeAPIRequest,
};
