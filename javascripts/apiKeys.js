const weatherAPI = require('./weatherAPI');
const firebaseAPI = require('./firebaseAPI');

const apiKey = () => {
  // constructor for new Promise {}
  return new Promise((resolve, reject) => {
    $.ajax('../db/apiKeys.json')
      .done(data => {
        // resolve
        resolve(data);
      })
      .fail(error => {
        reject(error);
      });
  });
};

const retrieveKeys = () => {
  apiKey() // call new Promise constructor func.
    .then(results => {
      weatherAPI.setKey(results.apiKeys.openWeatherMap.apiKey);
      firebaseAPI.setKey(results.firebaseKeys.apiKey);
      firebaseAPI.setFirebaseConfig(results.firebaseKeys);
      firebase.initializeApp(results.firebase);
    })
    .catch(error => {
      console.error(error);
    });
};

module.exports = {
  retrieveKeys,
};
