import React, { useState, useEffect, useMemo } from 'react';
import StatusBadge from '../components/StatusBadge';
import '../styles/ManageComplaints.css';

// Keep the hostel list for the filter buttons
const hostels = ['Hostel A', 'Hostel B', 'Hostel C', 'Hostel D'];

const ManageComplaints = () => {
  // LIVE DATABASE STATE
  const [complaints, setComplaints] = useState([]);
  const [activeHostel, setActiveHostel] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  // 1. FETCH LIVE TICKETS ON LOAD
  useEffect(() => {
    const fetchAllComplaints = async () => {
      try {
        const res = await fetch('https://hostelflow-z0xs.onrender.com/api/complaints');
        const data = await res.json();
        setComplaints(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching admin complaints:", error);
        setIsLoading(false);
      }
    };

    fetchAllComplaints();
  }, []);

  // Filter by Hostel logic
  const filteredComplaints = useMemo(() => {
    if (activeHostel === 'All') return complaints;
    return complaints.filter(c => c.hostel === activeHostel);
  }, [complaints, activeHostel]);

  const pendingTasks = filteredComplaints.filter(c => c.status === 'Pending');
  const resolvedTasks = filteredComplaints.filter(c => c.status === 'Resolved');

  // 2. UPDATE STATUS IN THE DATABASE
  const handleStatusToggle = async (ticketId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    
    // Optimistic UI Update (makes it feel instantly fast on screen)
    setComplaints(prev => prev.map(c => c.ticketId === ticketId ? { ...c, status: newStatus } : c));

    try {
      // Send the update to MongoDB
      await fetch(`https://hostelflow-z0xs.onrender.com/api/complaints/${ticketId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (error) {
      console.error("Failed to update status in DB:", error);
      alert("Failed to update database. Check connection.");
    }
  };

  return (
    <div className="manage-complaints-container" style={{ padding: '3rem 2.5rem' }}>
      <header className="admin-header">
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', letterSpacing: '-1px', color: 'var(--text-main)' }}>
            Triage <span style={{ color: 'var(--brand-primary)' }}>Center</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Drag-and-drop style task management for hostel staff.</p>
        </div>

        <div className="hostel-filter-pills">
          <button 
            className={`filter-pill ${activeHostel === 'All' ? 'active' : ''}`}
            onClick={() => setActiveHostel('All')}
          >
            All Hostels
          </button>
          {hostels.map(h => (
            <button 
              key={h}
              className={`filter-pill ${activeHostel === h ? 'active' : ''}`}
              onClick={() => setActiveHostel(h)}
            >
              {h}
            </button>
          ))}
        </div>
      </header>

      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '1.2rem' }}>Loading Live Triage Board...</p>
      ) : (
        <div className="triage-board">
          
          {/* COLUMN 1: PENDING */}
          <div className="triage-column urgent-column">
            <div className="column-header">
              <h2>🔥 Action Required</h2>
              <span className="task-count">{pendingTasks.length}</span>
            </div>
            
            <div className="task-list">
              {pendingTasks.length === 0 ? (
                <p className="empty-column-msg">No pending issues. Great job!</p>
              ) : (
                pendingTasks.map(task => (
                  <div className="admin-task-card" key={task._id}>
                    <div className="task-meta">
                      <span className="task-id">#{task.ticketId}</span>
                      <span className="task-hostel">{task.hostel} - {task.roomNumber}</span>
                    </div>
                    <h3 className="task-title">{task.category}</h3>
                    <p className="task-desc">"{task.description}"</p>
                    <div className="task-footer">
                      <span className="task-student">👤 {task.studentName}</span>
                      <button 
                        className="resolve-btn"
                        onClick={() => handleStatusToggle(task.ticketId, task.status)}
                      >
                        ✓ Mark Resolved
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* COLUMN 2: RESOLVED */}
          <div className="triage-column completed-column">
            <div className="column-header">
              <h2>✅ Completed</h2>
              <span className="task-count">{resolvedTasks.length}</span>
            </div>
            
            <div className="task-list">
              {resolvedTasks.length === 0 ? (
                <p className="empty-column-msg">No resolved issues yet.</p>
              ) : (
                resolvedTasks.map(task => (
                  <div className="admin-task-card resolved-card" key={task._id}>
                    <div className="task-meta">
                      <span className="task-id">#{task.ticketId}</span>
                      <span className="task-hostel">{task.hostel} - {task.roomNumber}</span>
                    </div>
                    <h3 className="task-title">{task.category}</h3>
                    <div className="task-footer">
                      <StatusBadge status="Resolved" />
                      <button 
                        className="reopen-btn"
                        onClick={() => handleStatusToggle(task.ticketId, task.status)}
                      >
                        ↺ Reopen
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default ManageComplaints;