import React, { useContext } from 'react';
import classes from './Weather.module.css';
import WeatherContext from '../../weather/weather-context';

const Weather = (props) => {
  const { localWeather, onCelsius, onFahrenheit, isFahrenheit } = props;
  const weatherCtx = useContext(WeatherContext);

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
            {weatherCtx.weather.current_temp}
            {metric}
          </h3>
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>High: </b>
          {weatherCtx.weather.hi_temp}
          {metric}
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>Weather: </b>
          {weatherCtx.weather.weather}
        </span>
      </div>
      <div className={classes['weather-container__controls']}>
        <span>
          <b>Humidity: </b>
          {weatherCtx.weather.humidity}%
        </span>
      </div>
    </React.Fragment>
  );
};

export default Weather;
