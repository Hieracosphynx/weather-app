import React, { useEffect, useCallback, useState } from 'react';
import classes from './Weather.module.css';

const Weather = (props) => {
  const { localWeather, onCelsius, onFahrenheit, isFahrenheit } = props;

  const onCelsiusHandler = () => {
    onCelsius({
      current_temp: localWeather.current_temp,
      hi_temp: localWeather.hi_temp,
    });
  };

  const onFahrenheitHandler = () => {
    onFahrenheit({
      current_temp: localWeather.current_temp,
      hi_temp: localWeather.hi_temp,
    });
  };
  let metric = '°F';

  if (isFahrenheit) {
    metric = '°F';
  }
  if (!isFahrenheit) {
    metric = '°C';
  }

  return (
    <React.Fragment>
      <div className={classes.metric}>
        <button onClick={onFahrenheitHandler}>
          {isFahrenheit ? (
            <b className={classes['current-metric']}>°F</b>
          ) : (
            '°F'
          )}
        </button>
        <button onClick={onCelsiusHandler}>
          {!isFahrenheit ? (
            <b className={classes['current-metric']}>°C</b>
          ) : (
            '°C'
          )}
        </button>
      </div>
      <div className={classes['weather-container__temp']}>
        <span>
          <h3>
            {localWeather.current_temp}
            {metric}
          </h3>
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>High: </b>
          {localWeather.hi_temp}
          {metric}
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
};

export default Weather;
