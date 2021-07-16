import { useEffect, useCallback, useState } from 'react';

import classes from './Weather.module.css';

const Weather = (props) => {
  const [localWeather, setLocalWeather] = useState([]);
  const showLocalWeatherHandler = useCallback(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=${props.api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather = {
          id: data.weather[0].id,
          weather: data.weather[0].main,
          description: data.weather[0].description,
          current_temp: convertTemp(data.main.temp).toFixed(2),
          hi_temp: convertTemp(data.main.temp_max).toFixed(2),
        };
        setLocalWeather(weather);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [props.api_key]);

  const convertTemp = (temp) => {
    return ((temp - 273.15) * 9) / 5 + 32;
  };

  useEffect(() => {
    showLocalWeatherHandler();
  }, [showLocalWeatherHandler]);

  return (
    <div className={classes['weather-container']}>
      <div className={classes['weather-container__temp']}>
        <span>
          <h3>{localWeather.current_temp} °F</h3>
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>Weather: </b>
          {localWeather.weather}
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>Description: </b>
          {localWeather.description}
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>High: </b>
          {localWeather.hi_temp} °F
        </span>
      </div>
    </div>
  );
};

export default Weather;
