const domIcons = require('./domIcons');

const randomBackground = input => {
  input.toLowerCase();
  const imageCount = 2;
  const randomCount = Math.round(Math.random() * (imageCount - 1)) + 1;
  const images = [];
  images.push(`${input}1.jpg`);
  images.push(`${input}2.jpg`);
  images.push(`${input}3.jpg`);
  $('body').css('background-image', `url('../images/${images[randomCount]}'`);
};

const randomBackgroundNonWeather = () => {
  const imageCount = 7;
  const randomCount = Math.round(Math.random() * (imageCount - 1)) + 1;
  const images = [];
  for (let i = 0; i <= imageCount; i++) {
    images.push(`none${i + 1}.jpg`);
  }
  $('body').css('background-image', `url('../images/${images[randomCount]}'`);
};

const buildCurrentWeatherMiniForecast = inputs => {
  const parsedData = parseForecastData(inputs.slice(1));
  let output = '';
  parsedData.forEach(input => {
    const date = parseDate(input.dt_txt);
    const iconCode = input.weather[0].icon;
    const icon = domIcons.findWeatherIcon(iconCode);
    output += `
    <div class='col-xs-2 text-center'>
      <h4 class='text-center'>${date}</h4>
      <span><i class="wi ${icon.icon} icon-mini-forecast" alt='${input.weather[0].main}'></i></span>
      <h5 class='text-center'>${Math.ceil(input.main.temp_max)}°/${Math.floor(input.main.temp_min)}°</h5>
    </div>`;
  });
  return output;
};

const buildCurrentWeatherDOM = data => {
  const iconCode = data.list[0].weather[0].icon;
  const icon = domIcons.findWeatherIcon(iconCode);
  const miniForecastToInsert = buildCurrentWeatherMiniForecast(data.list);
  randomBackground(icon.background);
  let output = '';
  output = `
      <div class='div-weather-background'>
        <div class='row'>
          <div class='col-xs-3 text-center' id='current-weather'>
            <h1 id='temp-current' class='text-center'>${Math.floor(data.list[0].main.temp)}°</h1>
            <h3 class='text-center'>${data.list[0].weather[0].main}</h3>
            <span><i class="wi ${icon.icon}" id='icon-current' alt='${data.list[0].weather[0].main}'></i></span>
            <h4 class='text-center'>Today</h4>
            <h5 class='text-center'>${Math.ceil(data.list[0].main.temp_max)}°/${Math.floor(data.list[0].main.temp_min)}°</h5>
          </div>
          <div class='col-xs-9 text-center' id='current-weather-additional'>
            <div class='row' id='current-weather-city'>
              <h1><strong>${data.city.name}</strong></h1>
              <h4>
              ${Math.floor(data.list[0].wind.speed)} mph
                <span><i class="wi wi-strong-wind" id='icon-wind' alt='Wind speed'></i></span>
                <span>${Math.floor(data.list[0].main.humidity)}  <i class="wi wi-humidity" id='icon-humidity' alt='Humidity Percentage'></i></span>
              </h4>
            </div>
            <div class='row' id='mini-forecast'>
              <div class='col-xs-1'></div>
              ${miniForecastToInsert}
            </div>
          </div>
        </div>

        <div class='row' id='toggle-forecast-weather'>
          <button class='switch-call-type btn-lg col-xs-2 col-xs-offset-10'>Forecast</button>
        </div>
      </div>`;
  printToDom('', '#div-forecasted-weather');
  printToDom(output, '#div-current-weather');
};

const parseDate = input => {
  input = input.slice(5,10);
  let month = '';
  if (input.startsWith('01')) {
    month = 'January';
  } else if (input.startsWith('02')) {
    month = 'February';
  } else if (input.startsWith('03')) {
    month = 'March';
  } else if (input.startsWith('04')) {
    month = 'April';
  } else if (input.startsWith('05')) {
    month = 'May';
  } else if (input.startsWith('06')) {
    month = 'June';
  } else if (input.startsWith('07')) {
    month = 'July';
  } else if (input.startsWith('08')) {
    month = 'August';
  } else if (input.startsWith('09')) {
    month = 'September';
  } else if (input.startsWith('10')) {
    month = 'October';
  } else if (input.startsWith('11')) {
    month = 'November';
  } else if (input.startsWith('12')) {
    month = 'December';
  }
  return `${month} ${input.substr(3)}`;
};

// Build forecast DOM string
const buildForecastForInsertion = inputs => {
  let output = '';
  inputs.forEach(input => {
    const date = parseDate(input.dt_txt);
    const iconCode = input.weather[0].icon;
    const icon = domIcons.findWeatherIcon(iconCode);
    output += `
    <div class='col-xs-2 text-center'>
      <div class='row'>
        <h4>${date}</h4>
      </div>
      <div class='row'>
        <span><i class="wi ${icon.icon} icon-forecast" alt='$'></i></span>
      </div>
      <div class='row'>
        <h4>${input.weather[0].main}</h4>
      </div>
      <div class='row'>
        <h4>${Math.floor(input.main.temp_max, 0)}°/${Math.floor(input.main.temp_min, 0)}°</h4>
      </div>
      <div class='row'>
  <h4>${input.main.humidity}<i class="wi wi-humidity icon-humidity" alt='Humidity Percentage'></i></span></h4>
      </div>
      <div class='row'>
  <h4>${Math.floor(input.wind.speed, 0)}<span><i class="wi wi-strong-wind" id='icon-wind' alt='Wind speed'></i></span></h4>
      </div>
    </div>
    `;
  });
  return output;
};

const parseForecastData = inputs => {
  const dailyMatch = [];
  inputs.forEach((input, index) => {
    if (index % 8 === 0) {
      dailyMatch.push(input);
    }
  });
  return dailyMatch;
};

const buildForecastDOM = data => {
  const parsedData = parseForecastData(data.list);
  const forecastToInsert = buildForecastForInsertion(parsedData);
  let output = '';
  parsedData.forEach(parsed => {
    output = `
    <div class='div-weather-background'>
    <div class='row'>
      <div class='col-sm-8 col-sm-offset-2'>
        <div class='row text-center' id='forecast-city-name'>
          <h3>${data.city.name}</h3>
        </div>
      </div>
    </div>
    <div class='row' id='div-forecasted'>
      <div class='col-xs-1'>
      </div>
      <!-- append to '#div-forecasted' -->
      ${forecastToInsert}
    </div>
    <div class='row' id='toggle-forecast-weather'>
      <button class='switch-call-type btn-lg col-xs-2 col-xs-offset-10'>Current</button>
    </div>
  </div>
    `;
  });
  randomBackgroundNonWeather();
  printToDom('', '#div-current-weather');
  printToDom(output, '#div-forecasted-weather');
};

const printToDom = (domString, divId) => {
  $(divId).html(domString);
};

module.exports = {
  buildCurrentWeatherDOM,
  buildForecastDOM,
  randomBackgroundNonWeather,
};
