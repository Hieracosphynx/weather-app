import { useState, useCallback, useEffect } from 'react';
import Weather from './Weather';
import Card from '../UI/Card';
import spinner from '../../assets/spinner.gif';
import classes from './Content.module.css';

const Content = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [isLoading, setIsLoading] = useState(true);
  const [localWeather, setLocalWeather] = useState([]);
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [error, setError] = useState(null);

  const kelvinToFahrenheit = (temp) => {
    return ((temp - 273.15) * 9) / 5 + 32;
  }; // Data received at OpenWeather is set to Kelvin.

  const convertToCelsius = (temp) => {
    return ((temp - 32) * 5) / 9;
  };

  const convertToFahrenheit = (temp) => {
    return (temp * 9) / 5 + 32;
  };

  const onFahrenheitHandler = (temp) => {
    if (!isFahrenheit) {
      setIsFahrenheit((prev) => !prev);
      const current_temp = convertToFahrenheit(temp.current_temp).toFixed(0);
      const hi_temp = convertToFahrenheit(temp.hi_temp).toFixed(0);
      setLocalWeather({
        current_temp: current_temp,
        hi_temp: hi_temp,
      });
    }
  };

  const onCelsiusHandler = (temp) => {
    if (isFahrenheit) {
      setIsFahrenheit(false);
      const current_temp = convertToCelsius(temp.current_temp).toFixed(2);
      const hi_temp = convertToCelsius(temp.hi_temp).toFixed(2);
      setLocalWeather({
        current_temp: current_temp,
        hi_temp: hi_temp,
      });
    }
  };

  const showLocalWeatherHandler = useCallback(() => {
    setIsLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        const weather = {
          id: data.weather[0].id,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
          current_temp: kelvinToFahrenheit(data.main.temp).toFixed(0),
          hi_temp: kelvinToFahrenheit(data.main.temp_max).toFixed(0),
        };
        setLocalWeather(weather);
        setIsLoading(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [API_KEY]);

  useEffect(() => {
    showLocalWeatherHandler();
  }, [showLocalWeatherHandler]);

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
