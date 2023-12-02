import { Link } from 'react-router-dom';

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
      {/* // To Do Cards */}
    </div>
  );
};

export default Main;
