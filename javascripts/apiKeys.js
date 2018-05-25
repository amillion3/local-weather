const retrieveKeys = () => {
  apiKey() // call new Promise constructor func.
    .then(results => {
      return results.OpenWeatherMap.apiKey;
    })
    .catch(error => {
      console.error(error);
    });
};

const apiKey = () => {
  // constructor for new Promise {}
  return new Promise((resolve, reject) => {
    $.ajax('../db/apiKeys.json')
      .done(data => {
        resolve(data.apiKeys);
      })
      .fail(error => {
        reject(error);
      });
  });
};

module.exports = {
  retrieveKeys,
};
