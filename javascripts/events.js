const dataGatekeeper = require('./dataGatekeeper');
const weatherAPI = require('./weatherAPI');

let userInput = '';

// -------------------- Gather zipcode from user
const alertErrorMessage = () => {
  alert('Please enter a valid, 5-digit zipcode.');
};
const validateInput = () => {
  if (userInput.length < 5 || userInput.length > 5) {
    alertErrorMessage();
  } else if (userInput.match(/[^\d]/)) {
    alertErrorMessage();
  } else {
    dataGatekeeper.setZipcode(userInput);
    // begin promise here
    weatherAPI.processAPIResponse();
  }
};
const searchWindowClicked = e => {
  if (e.target.type === 'button') {
    userInput = $('.form-control').val();
    validateInput();
  } else if (e.charCode === 13) {
    userInput = $('.form-control').val();
    validateInput();
  }
};
// end ---------- Gather zipcode from user

const updateTemps = input => {
  const formattedCurrent = `${input[0]}°`;
  const formattedMaxMin = `${input[1]}°/${input[2]}°`;
  $('#temp-current').text(formattedCurrent);
  $('#temp-max-min').text(formattedMaxMin);
};

const convertTemps = input => {
  const originalTemps = [];
  const convertedTemps = [];
  const tempCurrent = $('#temp-current').text();
  const tempMaxMin = ($('#temp-max-min').text()).split('/');
  originalTemps.push(tempCurrent);
  originalTemps.push(tempMaxMin[0]);
  originalTemps.push(tempMaxMin[1]);
  originalTemps.forEach(temp => {
    let converted = 0;
    const a = temp.slice(0, -1) * 1;

    if (input === true) {
      // (inputC * 9/5) + 32 === to fahrenheit
      converted = Math.floor(((a * 1.8) + 32) * 1, 0);
    } else if (input === false) {
      // (inputF - 32) * 5/9 === to celsius
      converted = Math.floor((((a - 32) * 1.8) * 1), 0);
    }
    convertedTemps.push(converted);
    updateTemps(convertedTemps);
  });
};

const sliderClicked = e => {
  const status = document.getElementById('slider-temp-converter').checked;
  convertTemps(status);
};

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);
  $(document).on('click', 'span', sliderClicked);
};

module.exports = {
  bindEvents,
};
