import Weather from './Weather';
import Card from '../UI/Card';

const Content = (props) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  return (
    <Card>
      <Weather api_key={API_KEY} />
    </Card>
  );
};

export default Content;
