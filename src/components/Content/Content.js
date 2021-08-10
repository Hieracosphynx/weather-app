import { useState, useContext, useEffect } from 'react';
import Weather from './Weather';
import Card from '../UI/Card';
import spinner from '../../assets/spinner.gif';
import classes from './Content.module.css';
import useHttp from '../../hooks/use-http.js';
import WeatherContext from '../../weather/weather-context';

const Content = () => {
  const { fetchHttp: fetchWeather, loading, error } = useHttp();
  const weatherCtx = useContext(WeatherContext);

  useEffect(() => {
    const getData = (weatherObject) => {
      weatherCtx.getWeatherHandler(weatherObject);
    };
    fetchWeather(getData);
  }, [fetchWeather]);

  return (
    <Card>
      {!loading || error ? (
        <Weather />
      ) : (
        <div className={classes['weather-container__temp']}>
          if(error){<b>{error}</b>}else{<img src={spinner} alt='Loading...' />}
        </div>
      )}
    </Card>
  );
};

export default Content;
