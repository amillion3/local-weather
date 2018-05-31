let firebaseAPIKey = '';
let firebaseConfig = '';

const setFirebaseConfig = a => {
  firebaseConfig = a;
  console.error('firebaseconfig', firebaseConfig);
};

const getKey = input => firebaseAPIKey;
const setKey = input => { firebaseAPIKey = input; };

const saveNewWeatherRecord = weatherEvent => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'POST',
      url: `${firebaseConfig.databaseURL}/weather.json`,
      data: JSON.stringify(weatherEvent),
    })
      .done(uniqueKey => {
        resolve(uniqueKey);
      })
      .fail(err => {
        reject(err);
      });
  });
};

const readExistingWeatherRecord = existingWeather => {};

const updateExistingWeatherRecord = existingWeather => {};

const deleteWeatherRecord = itemToDelete => {};

module.exports = {
  getKey,
  setKey,
  setFirebaseConfig,
  saveNewWeatherRecord,
  readExistingWeatherRecord,
  updateExistingWeatherRecord,
  deleteWeatherRecord,
};
