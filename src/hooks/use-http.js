import { useState, useCallback } from 'react';

const useHttp = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHttp = useCallback(
    async (location, applyData) => {
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
          current_temp: data.main.temp,
          hi_temp: data.main.temp_max,
          weather: data.weather[0].main,
          humidity: data.main.humidity,
        };
        setLoading(false);
        console.log(weather);
        applyData(weather);
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
