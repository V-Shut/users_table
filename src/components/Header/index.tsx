import { Link, useLocation } from 'react-router-dom';
import './style.css';

const buttons = [
  { path: '/', content: 'Edit Users' },
  { path: '/users', content: 'Users' }
];

export const Header = () => {
  const page = useLocation();
  return (
    <div className="header">
      {buttons.map(el => (
        <Link
          key={el.path}
          to={el.path}
          className={`header_button ${page.pathname === el.path ? 'active' : ''}`}
        >
          {el.content}
        </Link>
      ))}
    </div>
  );
};