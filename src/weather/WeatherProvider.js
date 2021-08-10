import { useState, useCallback } from 'react';
import WeatherContext from './weather-context';

const WeatherProvider = (props) => {
  const [weather, setWeather] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [isCelsius, setIsCelsius] = useState(false);

  const isFahrentheitHandler = () => {
    setIsFahrenheit(true);
    setIsCelsius(false);
  };

  const isCelsiusHandler = () => {
    setIsFahrenheit(false);
    setIsCelsius(true);
  };

  const getWeatherHandler = (weatherObject) => {
    setWeather({
      id: weatherObject.id,
      current_temp: weatherObject.current_temp,
      hi_temp: weatherObject.hi_temp,
      weather: weatherObject.weather,
      humidity: weatherObject.humidity,
    });
  };

  const weatherContext = {
    weather: weather,
    getWeatherHandler: getWeatherHandler,
    isFahrenheit: isFahrenheit,
    isFahrentheitHandler: isFahrentheitHandler,
    isCelsius: isCelsius,
    isCelsiusHandler: isCelsiusHandler,
  };
  return (
    <WeatherContext.Provider value={weatherContext}>
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
