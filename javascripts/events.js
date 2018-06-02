const dataGatekeeper = require('./dataGatekeeper');
const weatherAPI = require('./weatherAPI');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

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

const forecastWeatherToggle = e => {
  const currentSetting = dataGatekeeper.getApiCallType();
  if (currentSetting === 'weather') {
    dataGatekeeper.setApiCallType('forecast');
    weatherAPI.processAPIResponse();
  } else {
    dataGatekeeper.setApiCallType('weather');
    weatherAPI.processAPIResponse();
  }
};

const successWeatherAdd = () => {
  alert('This forecast has been saved.');
};

const saveButtonClicked = () => {
  $(document).on('click', '.glyphicon-floppy-disk', e => {
    // DOM is cleared, not the action I want
    const weatherEventToAddCard = $(e.target).closest('.container-weather-current');
    const weatherEventToAdd = {
      dtText: weatherEventToAddCard.find('.data-id').data('id'),
      city: weatherEventToAddCard.find('.weather-city').text(),
      conditions: weatherEventToAddCard.find('.weather-conditions').text(),
      tempCurrent: weatherEventToAddCard.find('.weather-current').text(),
      tempHigh: weatherEventToAddCard.find('.weather-high').text(),
      tempLow: weatherEventToAddCard.find('.weather-low').text(),
      humidity: weatherEventToAddCard.find('.weather-humidity').text(),
      windSpeed: weatherEventToAddCard.find('.weather-wind').text(),
      isScarry: false,
    };
    firebaseAPI.saveNewWeatherRecord(weatherEventToAdd)
      .then(() => {
        // weatherEventToAddCard.remove();
        successWeatherAdd();
      })
      .catch(err => {
        console.error('Error saving weather record', err);
      });
  });
};

const deleteButtonClicked = () => {
  $(document).on('click', '.glyphicon-trash', e => {
    // TO DO
    const firebaseTr = $(e.target).closest('tr');
    const firebaseId = firebaseTr[0].id;
    firebaseAPI.deleteWeatherRecord(firebaseId)
      .then(() => {
        $(`#${firebaseId}`).remove();
      })
      .catch(err => {
        console.error('Error removing weather record, ', err);
      });
  });

};

const dashboardViewClicked = () => {
  dom.printToDom('', '#div-current-weather');
  dom.printToDom('', '#div-forecasted-weather');
  // dom.printToDom('', '#div-dashboard');

  $(document).on('click', '#test-saved', e => {
    // TO DO
    firebaseAPI.readExistingWeatherRecord()
      .then(weatherArray => {
        dom.buildDashboardDOM(weatherArray);
      })
      .catch(err => {
        console.error('Error in retrieving weather records');
      });
  });
};

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);
  $(document).on('click', '.switch-call-type', forecastWeatherToggle);
  saveButtonClicked();
  deleteButtonClicked();
  dashboardViewClicked();
};

module.exports = {
  bindEvents,
};
