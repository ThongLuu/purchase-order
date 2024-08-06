import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';

function NavLink({ to, children, setLoading }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = location.pathname === to;

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      navigate(to);
    }, 1000); // Simulating a 1-second load time
  };

  return (
    <li>
      <Link to={to} className={isActive ? 'active' : ''} onClick={handleClick}>
        {children}
      </Link>
    </li>
  );
}

function AppContent({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(false);
  }, [location]);

  return (
    <div className="app-content">
      <nav className="app-nav">
        <ul>
          <NavLink to="/" setLoading={setLoading}>Dashboard</NavLink>
          <NavLink to="/list" setLoading={setLoading}>Purchase Order List</NavLink>
          <NavLink to="/review" setLoading={setLoading}>Review Purchase Orders</NavLink>
          <NavLink to="/users" setLoading={setLoading}>User Management</NavLink>
        </ul>
      </nav>
      <main className="app-main">
        {loading ? <Loading /> : children}
      </main>
    </div>
  );
}

export default AppContent;