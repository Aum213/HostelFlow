import React from 'react';
import '../styles/DashboardCards.css';

const DashboardCards = ({ stats }) => {
  return (
    <div className="dashboard-cards-grid">
      <div className="stat-card total">
        <div className="card-info">
          <h3>Total Requests</h3>
          <p className="stat-number">{stats.total || 0}</p>
        </div>
        <div className="card-icon">📁</div>
      </div>

      <div className="stat-card pending">
        <div className="card-info">
          <h3>In Progress</h3>
          <p className="stat-number">{stats.pending || 0}</p>
        </div>
        <div className="card-icon">⏳</div>
      </div>

      <div className="stat-card resolved">
        <div className="card-info">
          <h3>Resolved</h3>
          <p className="stat-number">{stats.resolved || 0}</p>
        </div>
        <div className="card-icon">✅</div>
      </div>
    </div>
  );
};

export default DashboardCards;