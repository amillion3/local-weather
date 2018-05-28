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

const buildCurrentWeatherDOM = data => {
  const iconCode = data.weather[0].icon;
  const icon = domIcons.findWeatherIcon(iconCode);
  randomBackground(icon.background);
  let output = '';
  output = `
      <div class='div-weather-background'>
        <div class='row'>
          <div class='col-xs-4 text-center' id='current-weather'>
          <div class='row' id='convert-switch'>
            <div class='col-sm-2'><h4 class='text-right'>F</h4></div>
            <div class='col-sm-6'>
              <checkit>
              <label class="switch">
                <input id='slider-temp-converter' type="checkbox">
                <span class="slider round"></span>
              </label>
              </checkit>
            </div>
            <div class='col-sm-2'><h4 class='text-left'>C</h4></div>
          </div>


            <h1 id='temp-current' class='text-center'>${Math.floor(data.main.temp)}°</h1>
            <h3 class='text-center'>${data.weather[0].main}</h3>
            <span><i class="wi ${icon.icon}" id='icon-current' alt='${data.weather[0].main}'></i></span>
          </div>
          <div class='col-xs-8 text-center' id='current-weather-additional'>
            <h1>${data.name}</h1>
            <h4>
            ${Math.floor(data.wind.speed)}mph
              <span><i class="wi wi-strong-wind" id='icon-wind' alt='Wind speed'></i></span>
              <span>${Math.floor(data.main.humidity)}  <i class="wi wi-humidity" id='icon-humidity' alt='Humidity Percentage'></i></span>
            </h4>
          </div>
        </div>
        <div class='row'>
          <div class='col-xs-2 col-xs-offset-1 text-center'>
            <h4 class='text-center'>Today</h4>
            <h5 id = 'temp-max-min' class='text-center'>${Math.floor(data.main.temp_max)}°/${Math.floor(data.main.temp_min)}°</h5>
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
