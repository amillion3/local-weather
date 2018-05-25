const buildCurrentWeatherDOM = () => {
  let output = '';
  output = '';
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
