import { useEffect, useState } from 'react';
import Card from '../UI/Card';

const Content = (props) => {
  const [weather, setWeather] = useState([]);

  let content = <p>No weather report</p>;

  const showWeatherHandler = async () => {
    const response = await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=Las%20Vegas,Nevada&appid=b63b0a32a568900a19d26e2dc3a8b980'
    );
    const weather = await response.json();
    console.log(weather);
  };

  return (
    <Card>
      <p>Hello</p>
      {weather.length === 0 && content}
      {weather.length > 0 && <p>Good</p>}
      <button onClick={showWeatherHandler}>Show Weather</button>
    </Card>
  );
};

export default Content;
