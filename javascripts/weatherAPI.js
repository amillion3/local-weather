const dataGK = require('./dataGatekeeper');
const dom = require('./dom');

let zip = '';
let key = '';

const processAPIResponse = () => {
  makeAPIRequest()
    .then(data => {
      console.error('key in right place', key);
      dom.buildCurrentWeatherDOM(data);

      // do stuff with JSON data here
    // City data.name
    // Temperature data.main.temp
    // Conditions weather.main
    // Conditions weather.description
    // Weather icons weather.icon
    // Air pressure data.main.pressure
    // Wind speed data.wind.speed
    // An affordance to view the forecast for the current day, or the next 5 days
    })
    .catch(err => {
      console.error(err);
    });
};

const buildApiUrl = () => {
  return `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&appid=${key}`;
};

const makeAPIRequest = () => {
  zip = dataGK.getZipcode();
  const apiUrl = buildApiUrl();
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
