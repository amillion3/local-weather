const dataGatekeeper = require('./dataGatekeeper');

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

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);
};

module.exports = {
  bindEvents,
};
