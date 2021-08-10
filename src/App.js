import Content from './components/Content/Content';
import classes from './App.module.css';
import WeatherProvider from './weather/WeatherProvider';

const App = () => {
  return (
    <WeatherProvider>
      <div className={classes.container}>
        <div className={classes.container__content}>
          <Content />
        </div>
      </div>
    </WeatherProvider>
  );
};

export default App;
