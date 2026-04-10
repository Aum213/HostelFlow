import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="top-navbar">
      <div className="nav-brand">
        <Link to="/">HOSTEL<span>FLOW</span></Link>
      </div>

      {user && (
        <div className="nav-links">
          <Link to={`/${user.role}-dashboard`} className={location.pathname.includes('dashboard') ? 'active' : ''}>Dashboard</Link>
          
          {user.role === 'student' ? (
            <>
              <Link to="/my-complaints" className={location.pathname === '/my-complaints' ? 'active' : ''}>My Complaints</Link>
              <Link to="/raise-complaint" className={location.pathname === '/raise-complaint' ? 'active' : ''}>Raise New</Link>
            </>
          ) : (
            <>
              <Link to="/manage-complaints" className={location.pathname === '/manage-complaints' ? 'active' : ''}>Manage All</Link>
            </>
          )}
        </div>
      )}

      <div className="nav-user">
        {user ? (
          <>
            <span className="user-tag">{user.email}</span>
            <button className="logout-pill" onClick={handleLogoutClick}>Logout</button>
          </>
        ) : (
          <Link to="/" className="login-pill">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;