import { Link } from 'react-router-dom';
import Cards from '../../shared/cards';

const Main = () => {
  return (
    <div>
      <div>
        <Link to={'/form1'}>
          <button>Form1</button>
        </Link>
        <Link to={'/form2'}>
          <button>Form2</button>
        </Link>
      </div>
      <Cards />
    </div>
  );
};

export default Main;
