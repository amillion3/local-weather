const dataGK = require('./dataGatekeeper');
const dom = require('./dom');

let zip = '';
let key = '';

const processAPIResponse = () => {
  makeAPIRequest()
    .then(data => {
      dom.buildCurrentWeatherDOM(data);
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
