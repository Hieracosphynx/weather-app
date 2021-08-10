import { useState, useCallback } from 'react';

const useHttp = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const kelvinToFahrenheit = (initialTemp) => {
    return ((initialTemp - 273.15) * 9) / 5 + 32;
  };

  const fetchHttp = useCallback(
    async (applyData) => {
      /**
       * Area / location is hardcoded IN openWeather URL API. PLans on changing it.
       */
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=${API_KEY}`
        );

        if (!response.ok) {
          throw new Error('Something went wrong....');
        }
        const data = await response.json();

        const weather = {
          id: data.weather[0].id,
          current_temp: kelvinToFahrenheit(data.main.temp).toFixed(0),
          hi_temp: kelvinToFahrenheit(data.main.temp_max).toFixed(0),
          weather: data.weather[0].main,
          humidity: data.main.humidity,
        };

        applyData(weather);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    },
    [API_KEY]
  );

  return {
    fetchHttp,
    loading,
    error,
  };
};

export default useHttp;
