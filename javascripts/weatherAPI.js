const dataGK = require('./dataGatekeeper');
const dom = require('./dom');

let zip = '';
let key = '';
let apiUrl = '';

const processAPIResponse = () => {
  makeAPIRequest()
    .then(data => {
      const status = dataGK.getApiCallType();
      if (status === 'weather') {
        dom.buildCurrentWeatherDOM(data);
        // dataGK.setCity(data.name);
      } else {
        dom.buildForecastDOM(data);
      }
    })
    .catch(err => {
      console.error(err);
    });
};

const buildApiUrl = () => {
  // const apiRequestType = dataGK.getApiCallType();
  // if (apiRequestType === 'forecast') {
  //   apiUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=${key}`;
  // } else {
  //   apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`;
  // }
  apiUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zip}&units=imperial&appid=${key}`;
};

const makeAPIRequest = () => {
  zip = dataGK.getZipcode();
  buildApiUrl();
  return new Promise((resolve, reject) => {
    $.ajax(apiUrl)
      .done(data => {
        resolve(data);
      }).
      fail(err => {
        reject(err);
      });
  });
};

const setKey = input => { key = input; };

module.exports = {
  processAPIResponse,
  setKey,
};
