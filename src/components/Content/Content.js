import { useState, useCallback, useEffect } from 'react';
import Weather from './Weather';
import Card from '../UI/Card';
import spinner from '../../assets/spinner.gif';
import classes from './Content.module.css';
import useHttp from '../../hooks/use-http.js';

const Content = () => {
  const { fetchHttp: fetchWeather } = useHttp();
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState('Las Vegas,Nevada');
  const [localWeather, setLocalWeather] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [error, setError] = useState(null);

  // const fetchData = useCallback(() => {
  //   const getData = (weatherObject) => {
  //     setLocalWeather(weatherObject);
  //   };

  //   fetchWeather(getData);
  // }, [fetchWeather, localWeather]);

  useEffect(() => {
    const getData = (weatherObject) => {
      setLocalWeather(weatherObject);
    };

    fetchWeather(getData);
  }, [fetchWeather]);

  return (
    <Card>
      {!isLoading || error ? (
        <Weather
          isFahrenheit={isFahrenheit}
          onFahrenheit={onFahrenheitHandler}
          onCelsius={onCelsiusHandler}
          localWeather={localWeather}
        />
      ) : (
        <div className={classes['weather-container__temp']}>
          if(error){<b>{error}</b>}else{<img src={spinner} alt='Loading...' />}
        </div>
      )}
    </Card>
  );
};

export default Content;
