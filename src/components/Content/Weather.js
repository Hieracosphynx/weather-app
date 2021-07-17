import React, { useEffect, useCallback, useState } from 'react';
import spinner from '../../assets/spinner.gif';
import classes from './Weather.module.css';

const Weather = (props) => {
  const [localWeather, setLocalWeather] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const showLocalWeatherHandler = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=${props.api_key}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather = {
          id: data.weather[0].id,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          current_temp: convertTemp(data.main.temp).toFixed(0),
          hi_temp: convertTemp(data.main.temp_max).toFixed(0),
        };
        setLocalWeather(weather);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e);
      });
  }, [props.api_key]);

  const convertTemp = (temp) => {
    return ((temp - 273.15) * 9) / 5 + 32;
  };

  useEffect(() => {
    showLocalWeatherHandler();
  }, [showLocalWeatherHandler]);

  let content = (
    <div className={classes['weather-container__temp']}>
      <img src={spinner} alt='Loading...' />
    </div>
  );

  if (!isLoading && !error) {
    content = (
      <React.Fragment>
        <div className={classes['weather-container__temp']}>
          <span>
            <h3>{localWeather.current_temp}°F</h3>
          </span>
        </div>
        <div className={classes['weather-container__controls']}>
          <span>
            <b>High: </b>
            {localWeather.hi_temp}°F
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
            <b>Humidity: </b>
            {localWeather.humidity}%
          </span>
        </div>
      </React.Fragment>
    );
  }

  if (error && isLoading) {
    content = (
      <div className={classes['weather-container__temp']}>
        <b>{error}</b>
      </div>
    );
  }

  return <div className={classes['weather-container']}>{content}</div>;
};

export default Weather;
