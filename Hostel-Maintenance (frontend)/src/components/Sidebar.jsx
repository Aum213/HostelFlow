import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/admin-dashboard">Dashboard Overview</Link></li>
          <li><Link to="/manage-complaints">Manage Complaints</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;