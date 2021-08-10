import { useState, useCallback } from 'react';
import WeatherContext from './weather-context';

const WeatherProvider = (props) => {
  const [weather, setWeather] = useState({});
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [isCelsius, setIsCelsius] = useState(false);

  const getWeatherHandler = (weatherObject) => {
    setWeather({
      id: weatherObject.id,
      current_temp: weatherObject.current_temp,
      hi_temp: weatherObject.hi_temp,
      weather: weatherObject.weather,
      humidity: weatherObject.humidity,
    });
  };

  const convertToFahrenheit = (celsiusTemp) => {
    return (celsiusTemp * 9) / 5 + 32;
  };

  const isFahrenheitHandler = () => {
    setIsFahrenheit(true);
    setIsCelsius(false);
    setWeather((currentWeather) => {
      return {
        id: currentWeather.id,
        current_temp: convertToFahrenheit(currentWeather.current_temp).toFixed(
          0
        ),
        hi_temp: convertToFahrenheit(currentWeather.hi_temp).toFixed(0),
        weather: currentWeather.weather,
        humidity: currentWeather.humidity,
      };
    });
  };

  const convertToCelsius = (fahrenheitTemp) => {
    return ((fahrenheitTemp - 32) * 5) / 9;
  };

  const isCelsiusHandler = () => {
    setIsFahrenheit(false);
    setIsCelsius(true);

    setWeather((currentWeather) => {
      return {
        id: currentWeather.id,
        current_temp: convertToCelsius(currentWeather.current_temp).toFixed(2),
        hi_temp: convertToCelsius(currentWeather.hi_temp).toFixed(2),
        weather: currentWeather.weather,
        humidity: currentWeather.humidity,
      };
    });
  };

  const weatherContext = {
    weather: weather,
    getWeatherHandler: getWeatherHandler,
    isFahrenheit: isFahrenheit,
    isFahrenheitHandler: isFahrenheitHandler,
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
