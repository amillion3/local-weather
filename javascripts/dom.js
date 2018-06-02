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

// Build CURRENT weather DOM string
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
        <div class='row container-weather-current'>
          <div class='col-xs-3 text-center data-id' id='current-weather' data-id='${data.list[0].dt}'>
            <h1 id='temp-current' class='text-center weather-current'>${Math.floor(data.list[0].main.temp)}</h1>
            <h3 class='text-center weather-conditions'>${data.list[0].weather[0].main}</h3>
            <span><i class="wi ${icon.icon}" id='icon-current' alt='${data.list[0].weather[0].main}'></i></span>
            <h4 class='text-center'>Today</h4>
            <div>
              <h5 class='text-center weather-high inline'>${Math.ceil(data.list[0].main.temp_max)}</h5>
              <h5 class='text-center inline'>°/</h5>
              <h5 class='text-center weather-low inline'>${Math.floor(data.list[0].main.temp_min)}</h5>
              <h5 class='text-center inline'>°</h5>
            </div>
          </div>
          <div class='col-xs-9 text-center' id='current-weather-additional'>
            <div class='row' id='current-weather-city'>
              <h1 class='weather-city'><strong>${data.city.name}</strong></h1>
              <div class='row'>
                <span class='inline'>
                  <h4 class='weather-wind inline'>${Math.floor(data.list[0].wind.speed)}</h4>
                  <h4 class='inline'> mph</h4><i class="wi wi-strong-wind inline" id='icon-wind' alt='Wind speed'></i>
                </span>
                <span class='inline'>
                  <h4 class='weather-humidity inline'>${Math.floor(data.list[0].main.humidity)}</h4><i class="wi wi-humidity inline" id='icon-humidity' alt='Humidity Percentage'></i></span>
                </h4>
              </div>
              <div class='row weather-buttons text-right'>
                <span class='glyphicon glyphicon-floppy-disk span-blue' aria-hidden="true"></span>
                <span class='glyphicon glyphicon-exclamation-sign span-red' aria-hidden="true"></span>
              </div>
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
  printToDom('', '#div-current-weather');
  printToDom('', '#div-forecasted-weather');
  // printToDom('', '#div-dashboard');
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

// Build FORECAST weather DOM string
const buildForecastForInsertion = inputs => {
  let output = '';
  console.error(inputs);
  inputs.forEach(input => {
    const date = parseDate(input.dt_txt);
    const iconCode = input.weather[0].icon;
    const icon = domIcons.findWeatherIcon(iconCode);
    output += `
    <div class='col-xs-2 text-center data-id' data-id=${input.dt_txt}>
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
      <div class='row weather-buttons'>
        <span class='glyphicon glyphicon-floppy-disk span-blue' aria-hidden="true"></span>
        <span class='glyphicon glyphicon-exclamation-sign span-red' aria-hidden="true"></span>
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
  printToDom('', '#div-forecasted-weather');
  // printToDom('', '#div-dashboard');
  printToDom(output, '#div-forecasted-weather');
};

const buildDashboardRows = data => {
  let output = '';
  data.forEach(row => {
    output += `
    <tr id=${row.id}>
      <td>${row.city}</td>
      <td>${row.dtText}</td>
      <td>${row.tempCurrent}</td>
      <td>${row.conditions}</td>
      <td>${row.humidity}</td>
      <td>${row.windSpeed}</td>
      <td class='text-center'>
        <span class='glyphicon glyphicon-trash span-red' aria-hidden="true"></span>
      </td>
  </tr>`;
  });
  return output;
};

const buildDashboardDOM = data => {
  const output = `
  <div class='div-weather-background'>
    <div class = 'row col-xs-12 text-center' id='dashboard-title'>
    <h2><em>Your</em> dashboard</h2>
    </div>
    <div class ='row col-xs-12'>
      <table class="table table-striped">
        <tr class='header'>
          <th class='th-size'>Location</th>
          <th class='th-size'>Date</th>
          <th class='th-size'>Current Temperature</th>
          <th class='th-size'>Condition</th>
          <th class='th-size'>Humidity</th>
          <th class='th-size'>Wind Speed</th>
          <th class='th-size'>Delete</th>
        </tr>
        ${buildDashboardRows(data)}
      </table>
    </div>
  </div>`;
  randomBackgroundNonWeather();
  printToDom('', '#div-current-weather');
  printToDom('', '#div-forecasted-weather');
  printToDom('', '#div-dashboard');
  printToDom(output, '#div-dashboard');
};

const printToDom = (domString, divId) => {
  $(divId).html(domString);
};

module.exports = {
  randomBackgroundNonWeather,
  buildCurrentWeatherDOM,
  buildForecastDOM,
  buildDashboardDOM,
  printToDom,
};
