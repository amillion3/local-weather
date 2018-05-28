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
  console.error(input);
};

const convertTemps = input => {
  const originalTemps = [];
  const tempCurrent = $('#temp-current').text();
  const tempMaxMin = ($('#temp-max-min').text()).split('/');
  console.error(tempCurrent);
  console.error(tempMaxMin);
  originalTemps.push(tempCurrent);
  originalTemps.push(tempMaxMin[0]);
  originalTemps.push(tempMaxMin[1]);
  originalTemps.forEach(temp => {
    const a = temp.slice(0, -1) * 1;
    console.error('a ', a);
    if (input === true) {
      // (inputC * 9/5) + 32 === to fahrenheit
      originalTemps.push(((a * (9 / 5)) + 32) * 1);
      console.error('temp', temp);
    } else if (input === false) {
      // (inputF - 32) * 5/9 === to celsius
      originalTemps.push(((a - 32) * (5 / 9)) * 1);
      console.error('temp', temp);
    }
    console.error('final', originalTemps);
    updateTemps(originalTemps);
  });
};

const sliderClicked = e => {
  const status = document.getElementById('slider-temp-converter').checked;
  console.error(status);
  convertTemps(status);
};

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);
  $(document).on('click', 'span', sliderClicked);
};

module.exports = {
  bindEvents,
};
