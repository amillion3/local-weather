const weatherAPI = require('./weatherAPI');

const apiKey = () => {
  // constructor for new Promise {}
  return new Promise((resolve, reject) => {
    $.ajax('../db/apiKeys.json')
      .done(data => {
        resolve(data.apiKeys.openWeatherMap.apiKey);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const retrieveKeys = () => {
  apiKey() // call new Promise constructor func.
    .then(results => {
      console.error('results', results);
      weatherAPI.setKey(results);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  retrieveKeys,
};
