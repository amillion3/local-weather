const dataGatekeeper = require('./dataGatekeeper');
const weatherAPI = require('./weatherAPI');
const firebaseAPI = require('./firebaseAPI');
const dom = require('./dom');

let userInput = '';

// -------------------- Gather zipcode from user

const validateInput = () => {
  if (userInput.length < 5 || userInput.length > 5) {
    dom.alertMessages('zip');
  } else if (userInput.match(/[^\d]/)) {
    dom.alertMessages('zip');
  } else {
    dataGatekeeper.setZipcode(userInput);
    // begin promise here
    weatherAPI.processAPIResponse();
  }
};
const searchWindowClicked = e => {
  if (e.target.id === 'search-zip') {
    userInput = $('.zip').val();
    validateInput();
  } else if (e.charCode === 13) {
    userInput = $('.zip').val();
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

const saveButtonClicked = () => {
  $(document).on('click', '.glyphicon-floppy-disk', e => {
    // DOM is cleared, not the action I want
    const weatherEventToAddCard = $(e.target).closest('.forecast');
    const weatherEventToAdd = {
      dtText: weatherEventToAddCard.find('.weather-date').text(),
      city: weatherEventToAddCard.find('.weather-city').text(),
      conditions: weatherEventToAddCard.find('.weather-conditions').text(),
      tempHigh: weatherEventToAddCard.find('.weather-max').text(),
      tempLow: weatherEventToAddCard.find('.weather-min').text(),
      humidity: weatherEventToAddCard.find('.weather-humidity').text(),
      windSpeed: weatherEventToAddCard.find('.weather-wind').text(),
      isScarry: false,
    };
    firebaseAPI.saveNewWeatherRecord(weatherEventToAdd)
      .then(() => {
        dom.alertMessages('weather-save');
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
  dom.clearDivs();
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

const updateDashboardRow = (e, input) => {
  $(e.target).closest('td').html('').html(`1${JSON.stringify(input.isScarry)} <span class='glyphicon glyphicon-transfer span-red scary' aria-hidden="true"></span>`);
};

// const switchScary = input => {
//   let output = '';
//   console.error('before switch', input);
//   console.error('typeof', typeof(input));
//   if (input === 'true' || input === true) {
//     output = false;
//     console.error('TO TRUE', output);
//   } else {
//     output = true;
//     console.error(input);
//     console.error('ELSE', output);
//   }
//   return output;
// };

const scaryUpdateClicked = () => {
  $(document).on('click', '.glyphicon-transfer', e => {
    const firebaseId = $(e.target).closest('tr').attr('id');
    const weatherEventElement = $(e.target).closest('tr');
    let tempHigh = weatherEventElement.find('.tempHigh').text();
    let tempLow = weatherEventElement.find('.tempLow').text();
    let humidity = weatherEventElement.find('.humidity').text();
    let windSpeed = weatherEventElement.find('.wind').text();
    let scary = Boolean(weatherEventElement.find('.scary').text());
    console.error('prescary', scary);
    console.error(typeof(scary));
    // remove non-numeric and switch scary
    tempHigh = tempHigh.replace(/\D/g,'');
    tempLow = tempLow.replace(/\D/g,'');
    humidity = humidity.replace(/\D/g,'');
    windSpeed = windSpeed.replace(/\D/g,'');
    scary = !scary;
    console.error('POST scary', scary);
    // console.error(switchScary());
    // scary = switchScary(scary);

    const updatedObject = {
      'dtText': weatherEventElement.find('.date').text(),
      'city': weatherEventElement.find('.city').text(),
      'conditions': weatherEventElement.find('.conditions').text(),
      'tempHigh': tempHigh,
      'tempLow': tempLow,
      'humidity': humidity,
      'windSpeed': windSpeed,
      'isScarry': scary,
    };
    console.error('updatedobject  ', updatedObject);
    firebaseAPI.updateExistingWeatherRecord(updatedObject, firebaseId)
      .then(() => {
        // reprint/update DOM from firebase
        console.error('updatedObject .then()');
        updateDashboardRow(e, updatedObject);
      })
      .catch(err => {
        console.error('Error updating database record', err);
      });
  });
};

const authEvents = () => {
  // switch to register form
  $('#register-link').click(() => {
    $('#div-auth-login').addClass('hide');
    $('#div-auth-register').removeClass('hide');
  });
  // switch to login form
  $('#login-link').click(() => {
    $('#div-auth-login').removeClass('hide');
    $('#div-auth-register').addClass('hide');
  });
  // user signs in
  $('#userLoginButton').click(e => {
    e.preventDefault();
    const email = $('#userEmail').val();
    const password = $('#userPassword').val();
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.error('successful login');
        $('#header-buttons').removeClass('hide');
        $('#div-auth-login').addClass('hide');
        $('#div-auth-register').addClass('hide');
        $('#div-current-weather').removeClass('hide');
        $('#div-search').removeClass('hide');
      })
      .catch(function (error) {
        // Handle Errors here.
        console.error(error.message);
      });
  });

  // user registers
  $('#userRegisterButton').click(e => {
    e.preventDefault();
    const email = $('#registerEmail').val();
    const pass = $('#registerPassword').val();
    firebase.auth().createUserWithEmailAndPassword(email, pass)
      .then(() => {
        dom.alertMessages('register');
        $('#div-auth-login').removeClass('hide');
        $('#div-auth-register').addClass('hide');
      })
      .catch((error) => {
        console.error('error registering');
        console.error(error.message);
      });
  });

  $('#logout').click(() => {
    firebase.auth().signOut().then(() => {
    })
      .then(() => {
        console.error('user has logged out'); // to delete
        $('#header-buttons').addClass('hide');
        $('#div-auth-login').removeClass('hide');
        $('#div-current-weather').addClass('hide');
        $('#div-forecasted-weather').addClass('hide');
        $('#div-dashboard').addClass('hide');
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  });
};

const bindEvents = () => {
  $('#div-search').on('click keypress', searchWindowClicked);
  $(document).on('click', '.switch-call-type', forecastWeatherToggle);
  saveButtonClicked();
  deleteButtonClicked();
  dashboardViewClicked();
  scaryUpdateClicked();
  authEvents();
};

module.exports = {
  bindEvents,
};
