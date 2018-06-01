let firebaseAPIKey = '';
let firebaseConfig = '';

const setFirebaseConfig = a => {
  firebaseConfig = a;
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

const readExistingWeatherRecord = () => {
  return new Promise((resolve, reject) => {
    const weatherEventsArray = [];
    $.ajax({
      method: 'GET',
      url: `${firebaseConfig.databaseURL}/weather.json`,
    })
      .done(fbResponseWeatherEvents => {
        if (fbResponseWeatherEvents !== null) {
          Object.keys(fbResponseWeatherEvents).forEach(fbKey => {
            fbResponseWeatherEvents[fbKey].id = fbKey;
            weatherEventsArray.push(fbResponseWeatherEvents[fbKey]);
          });
        }
        resolve(weatherEventsArray);
      })
      .fail(err => {
        reject(err);
      });
  });
};

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
