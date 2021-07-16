import Content from './components/Content/Content';
import classes from './App.module.css';

const App = () => {
  return (
    <div className={classes.container}>
      <div className={classes.container__header}>
        <h3>Hieracosphynx</h3>
      </div>
      <div className={classes.container__content}>
        <Content />
      </div>
    </div>
  );
};

export default App;
