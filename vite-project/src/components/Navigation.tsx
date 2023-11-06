import {} from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav
      style={{
        borderBottom: 'solid 1px',
        paddingBottom: '0.5rem',
      }}
    >
      <Link to="/page">Prev </Link>
      <Link to="/page">Next </Link>
    </nav>
  );
}
