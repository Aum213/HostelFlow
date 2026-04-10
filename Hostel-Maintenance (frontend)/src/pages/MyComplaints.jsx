import React, { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';
import '../styles/MyComplaints.css';

const MyComplaints = ({ user }) => {
  const activeUser = user || JSON.parse(localStorage.getItem('user'));

  // LIVE DATABASE STATE
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMyComplaints = async () => {
      try {
        const res = await fetch('https://hostelflow-z0xs.onrender.com/api/complaints');
        const data = await res.json();
        
        // Filter for ONLY this student
        const filtered = data.filter(c => 
            c.studentEmail === activeUser?.email || 
            c.studentName?.toLowerCase() === activeUser?.name?.toLowerCase()
        );
        setComplaints(filtered);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setIsLoading(false);
      }
    };

    fetchMyComplaints();
  }, [activeUser]);

  return (
    <div className="my-complaints-container" style={{ padding: '3rem 0' }}>
      <header className="page-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px' }}>
          Maintenance <span style={{ color: 'var(--brand-primary)' }}>Tickets</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Tracking your active and resolved requests.</p>
      </header>
      
      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginTop: '2rem' }}>Loading your tickets...</p>
      ) : complaints.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h3>All Clear!</h3>
          <p>You have no maintenance requests. Everything is working perfectly.</p>
        </div>
      ) : (
        <div className="ticket-grid">
          {complaints.map(ticket => (
            // Notice we use ticket.ticketId now, matching our MongoDB schema!
            <div className="ticket-card" key={ticket._id}>
              <div className="ticket-header">
                <span className="ticket-id">#{ticket.ticketId}</span>
                <StatusBadge status={ticket.status} />
              </div>
              <div className="ticket-body">
                <h3 className="ticket-category">{ticket.category}</h3>
                <p className="ticket-room">📍 Room: <strong>{ticket.roomNumber}</strong></p>
                <p className="ticket-desc">"{ticket.description}"</p>
              </div>
              <div className="ticket-footer">
                <span className="ticket-date">{ticket.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComplaints;