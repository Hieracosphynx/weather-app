import { useEffect, useCallback, useState } from 'react';

import classes from './Weather.module.css';

const Weather = (props) => {
  const [localWeather, setLocalWeather] = useState([]);
  const API_KEY = process.env.REACT_APP_API_KEY;
  const showLocalWeatherHandler = useCallback(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather = {
          id: data.weather[0].id,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          current_temp: convertTemp(data.main.temp.toFixed(2)),
          hi_temp: convertTemp(data.main.temp_max.toFixed(2)),
        };
        setLocalWeather(weather);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [API_KEY]);

  const convertTemp = (temp) => {
    return ((temp - 273.15) * 9) / 5 + 32;
  };

  useEffect(() => {
    showLocalWeatherHandler();
  }, [showLocalWeatherHandler]);

  return (
    <div>
      <span>
        <h4>Weather:</h4>
        <p>{localWeather.weather}</p>
      </span>
      <span>
        <h4>Description:</h4>
        <p>{localWeather.description}</p>
      </span>
      <span>
        <h4>Current Temperature:</h4>
        <p>{localWeather.current_temp} °F</p>
      </span>
      <span>
        <h4>High:</h4>
        <p>{localWeather.hi_temp} °F</p>
      </span>
    </div>
  );
};

export default Weather;
