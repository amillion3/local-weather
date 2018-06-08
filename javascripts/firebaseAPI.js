let firebaseAPIKey = '';
let firebaseConfig = '';
let uid = '';

const setFirebaseConfig = a => {
  firebaseConfig = a;
};

const setUID = newUid => {
  uid = newUid;
  console.error('user ID', uid); // delete this
};

const getKey = () => firebaseAPIKey;
const setKey = input => { firebaseAPIKey = input; };

const saveNewWeatherRecord = weatherEvent => {
  weatherEvent.uid = uid;
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
      url: `${firebaseConfig.databaseURL}/weather.json?orderBy="uid"&equalTo="${uid}"`,
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
  setUID,
};
