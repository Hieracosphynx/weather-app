import React from 'react';
const WeatherContext = React.createContext({
  weather: {
    id: null,
    current_temp: null,
    hi_temp: null,
    weather: null,
    humidity: null,
  },
  getWeatherHandler: (Object) => {},
  isFahrenheit: true,
  isFahrenheitHandler: () => {},
  isCelsius: false,
  isCelsiusHandler: () => {},
});

export default WeatherContext;
