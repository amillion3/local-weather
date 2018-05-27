const findWeatherIcon = icon => {
  let iconCode = '';
  switch (icon) {
    case '01d': // day - sunny/clear
      iconCode = 'wi-day-sunny';
      break;
    case '01n': // night - clear
      iconCode = 'wi-night-clear';
      break;
    case '02d': // day - few clouds
      iconCode = 'wi-day-cloudy';
      break;
    case '02n': // night - few clouds
      iconCode = 'wi-night-alt-cloudy';
      break;
    case '03d': // day - scattered clouds
      iconCode = 'wi-cloudy';
      break;
    case '03n': // night - scattered clouds
      iconCode = 'wi-cloudy';
      break;
    case '04d': // day - broken clouds
      iconCode = 'wi-cloudy';
      break;
    case '04n': // night - broken clouds
      iconCode = 'wi-cloudy';
      break;
    case '09d': // day - shower rain
      iconCode = 'wi-day-showers';
      break;
    case '09n': // night - shower rain
      iconCode = 'wwi-night-alt-showers';
      break;
    case '10d': // day - rain
      iconCode = 'wi-day-rain';
      break;
    case '10n': // night - rain
      iconCode = 'wi-night-rain';
      break;
    case '11d': // day - thunderstorm
      iconCode = 'wi-day-thunderstorm';
      break;
    case '11n': // night - thunderstorm
      iconCode = 'wi-night-alt-thunderstorm';
      break;
    case '13d': // day - snow
      iconCode = 'wi-day-snow';
      break;
    case '13n': // night - snow
      iconCode = 'wi-night-alt-snow';
      break;
    case '50d': // day - mist
      iconCode = 'wi-sprinkle';
      break;
    case '50n': // night - mist
      iconCode = 'wi-sprinkle';
      break;
    default:
      iconCode = 'wi-na';
  }
  return iconCode;
};

module.exports = {
  findWeatherIcon,
};
