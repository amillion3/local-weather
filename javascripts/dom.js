const domIcons = require('./domIcons');

const buildCurrentWeatherDOM = data => {
  const iconCode = data.weather[0].icon;
  const icon = domIcons.findWeatherIcon(iconCode);
  let output = '';
  output = `
      <div class='div-weather-background'>
        <div class='row'>
          <div class='col-xs-4 text-center' id='current-weather'>
            <h1>${Math.floor(data.main.temp)}°</h1>
            <h3>${data.weather.main}</h3>
            <span><i class="wi ${icon}"></i></span>
          </div>
          <div class='col-xs-8 text-center' id='current-weather-additional'>
            <h1>${data.name}</h1>
            <h3>Wind ${Math.floor(data.wind.speed)}MPH @ ${Math.floor(data.wind.deg)}°</h3>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-2 col-xs-offset-1'>
            <h4>Today</h4>
            <h5>${Math.floor(data.main.temp_min)}°/${Math.floor(data.main.temp_max)}°</h5>
          </div>
          <div class='col-xs-2'>
            <h4>Saturday</h4>
            <h3>{-}</h3>
            <h5>88°/62°</h5>
          </div>
          <div class='col-xs-2'>
            <h4>Sunday</h4>
            <h3>{-}</h3>
            <h5>88°/62°</h5>
          </div>
          <div class='col-xs-2'>
            <h4>Monday</h4>
            <h3>{-}</h3>
            <h5>88°/62°</h5>
          </div>
          <div class='col-xs-2'>
            <h4>Tuesday</h4>
            <h3>{-}</h3>
            <h5>88°/62°</h5>
          </div>
        </div>
      </div>`;
  printToDom(output, '#div-current-weather');
};

const buildForecastDOM = () => {
  let output = '';
  output = '';
  printToDom(output, '#div-forecasted-weather');
};

const printToDom = (domString, divId) => {
  $(divId).html(domString);
};

module.exports = {
  buildCurrentWeatherDOM,
  buildForecastDOM,
};
