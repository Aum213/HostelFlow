import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCards from '../components/DashboardCards';
import ComplaintTable from '../components/ComplaintTable';
import NoticeBoard from '../components/NoticeBoard';

const StudentDashboard = ({ user }) => {
  const navigate = useNavigate();
  const activeUser = user || JSON.parse(localStorage.getItem('user'));
  
  // LIVE DATABASE STATES
  const [myComplaints, setMyComplaints] = useState([]);
  const [currentNotice, setCurrentNotice] = useState("Loading notices...");
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA FROM SERVER ON LOAD
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // 1. Fetch the live notice
        const noticeRes = await fetch('https://hostelflow-z0xs.onrender.com/api/notice');
        const noticeData = await noticeRes.json();
        setCurrentNotice(noticeData.content || "No active notices at this time.");

        // 2. Fetch all live complaints
        const complaintsRes = await fetch('https://hostelflow-z0xs.onrender.com/api/complaints');
        const complaintsData = await complaintsRes.json();

        // 3. Filter the complaints so the student ONLY sees their own tickets
        const filtered = complaintsData.filter(c => 
          c.studentEmail === activeUser?.email || 
          c.studentName?.toLowerCase() === activeUser?.name?.toLowerCase()
        );
        
        setMyComplaints(filtered);
        setIsLoading(false);

      } catch (error) {
        console.error("Error fetching data:", error);
        setCurrentNotice("Failed to connect to the server.");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [activeUser]);

  // Calculate live stats
  const stats = {
    total: myComplaints.length,
    pending: myComplaints.filter(c => c.status === 'Pending').length,
    resolved: myComplaints.filter(c => c.status === 'Resolved').length
  };

  return (
    <div className="student-dashboard" style={{ padding: '2.5rem' }}>
      
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main, #1e293b)' }}>
          Welcome, <span style={{color: 'var(--brand-primary, #4f46e5)'}}>{activeUser?.name}</span>
        </h1>
        <p style={{ color: 'var(--text-muted, #64748b)' }}>Portal ID: {activeUser?.email}</p>
      </header>

      <div className="dashboard-hero-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
        
        {/* LEFT COLUMN: LIVE NOTICE BOARD */}
        <div className="notice-column">
          <NoticeBoard note={currentNotice} />
        </div>

        {/* RIGHT COLUMN: LIVE STATS */}
        <div className="actions-column">
          <DashboardCards stats={stats} />
          
          <button 
            onClick={() => navigate('/raise-complaint')} 
            className="btn-primary"
            style={{ marginTop: '2rem', width: '100%', padding: '1rem', fontSize: '1rem', display: 'block', textAlign: 'center' }}
          >
            + Raise New Complaint
          </button>
        </div>
      </div>

      {/* LOWER SECTION: LIVE TABLE */}
      <div className="glass-card" style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>Recent Submissions</h2>
          <button 
            onClick={() => navigate('/my-complaints')} 
            style={{background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: '600', cursor: 'pointer'}}
          >
            View All →
          </button>
        </div>
        
        {isLoading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading live database...</p>
        ) : (
          <ComplaintTable complaints={myComplaints.slice(0, 5)} />
        )}

      </div>
    </div>
  );
};

export default StudentDashboard;