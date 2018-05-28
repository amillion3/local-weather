const findWeatherIcon = icon => {
  let iconCode = '';
  let backgroundType = '';
  switch (icon) {
    case '01d': // day - sunny/clear
      backgroundType = 'sunny';
      iconCode = 'wi-day-sunny';
      break;
    case '01n': // night - clear
      backgroundType = 'sunny';
      iconCode = 'wi-night-clear';
      break;
    case '02d': // day - few clouds
      backgroundType = 'clouds';
      iconCode = 'wi-day-cloudy';
      break;
    case '02n': // night - few clouds
      backgroundType = 'clouds';
      iconCode = 'wi-night-alt-cloudy';
      break;
    case '03d': // day - scattered clouds
      iconCode = 'wi-cloudy';
      backgroundType = 'clouds';
      break;
    case '03n': // night - scattered clouds
      iconCode = 'wi-cloudy';
      backgroundType = 'clouds';
      break;
    case '04d': // day - broken clouds
      iconCode = 'wi-cloudy';
      backgroundType = 'clouds';
      break;
    case '04n': // night - broken clouds
      iconCode = 'wi-cloudy';
      backgroundType = 'clouds';
      break;
    case '09d': // day - shower rain
      iconCode = 'wi-day-showers';
      backgroundType = 'rain';
      break;
    case '09n': // night - shower rain
      iconCode = 'wwi-night-alt-showers';
      backgroundType = 'rain';
      break;
    case '10d': // day - rain
      iconCode = 'wi-day-rain';
      backgroundType = 'rain';
      break;
    case '10n': // night - rain
      iconCode = 'wi-night-rain';
      backgroundType = 'rain';
      break;
    case '11d': // day - thunderstorm
      iconCode = 'wi-day-thunderstorm';
      backgroundType = 'thunderstorm';
      break;
    case '11n': // night - thunderstorm
      iconCode = 'wi-night-alt-thunderstorm';
      backgroundType = 'thunderstorm';
      break;
    case '13d': // day - snow
      iconCode = 'wi-day-snow';
      backgroundType = 'snow';
      break;
    case '13n': // night - snow
      iconCode = 'wi-night-alt-snow';
      backgroundType = 'snow';
      break;
    case '50d': // day - mist
      iconCode = 'wi-sprinkle';
      backgroundType = 'mist';
      break;
    case '50n': // night - mist
      iconCode = 'wi-sprinkle';
      backgroundType = 'mist';
      break;
    default:
      iconCode = 'wi-na';
      backgroundType = 'none';
  }
  const output = {
    'icon': `${iconCode}`,
    'background': `${backgroundType}`,
  };
  return output;
};

module.exports = {
  findWeatherIcon,
};
