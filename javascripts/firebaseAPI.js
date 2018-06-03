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

const deleteWeatherRecord = itemToDelete => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'DELETE',
      url: `${firebaseConfig.databaseURL}/weather/${itemToDelete}.json`,
    })
      .then(thisWillBeNull => {
        resolve(thisWillBeNull);
      })
      .catch(err => reject(err));
  });
};

const updateExistingWeatherRecord = (weatherObj, firebaseId) => {
  return new Promise((resolve, reject) => {
    $.ajax({
      method: 'PUT',
      url: `${firebaseConfig.databaseURL}/weather/${firebaseId}.json`,
      data: JSON.stringify(weatherObj),
    })
      .then(updatedObjFromFirebase => {
        resolve(updatedObjFromFirebase);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = {
  getKey,
  setKey,
  setFirebaseConfig,
  saveNewWeatherRecord,
  readExistingWeatherRecord,
  updateExistingWeatherRecord,
  deleteWeatherRecord,
};
