import React, { useState, useEffect } from 'react';
import DashboardCards from '../components/DashboardCards';
import ComplaintTable from '../components/ComplaintTable';
import NoticeBoard from '../components/NoticeBoard';
import Toast from '../components/Toast'; 

const AdminDashboard = ({ user }) => {
  const activeUser = user || JSON.parse(localStorage.getItem('user'));
  
  const [notice, setNotice] = useState("");
  const [liveNotice, setLiveNotice] = useState("Loading...");
  const [showToast, setShowToast] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  // LIVE DATABASE STATES
  const [allComplaints, setAllComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH DATA ON LOAD
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // 1. Fetch the current live notice
        const noticeRes = await fetch('http://localhost:5000/api/notice');
        const noticeData = await noticeRes.json();
        setLiveNotice(noticeData.content || "No active notices at this time.");
        setNotice(noticeData.content || ""); // Pre-fill the textarea

        // 2. Fetch ALL complaints for the Admin
        const complaintsRes = await fetch('http://localhost:5000/api/complaints');
        const complaintsData = await complaintsRes.json();
        
        setAllComplaints(complaintsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // POST NEW NOTICE TO SERVER
  const handleSaveNotice = async () => {
    if (!notice.trim()) return;
    setIsPosting(true);

    try {
      const response = await fetch('http://localhost:5000/api/notice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: notice })
      });

      if (!response.ok) throw new Error('Failed to save notice');

      setLiveNotice(notice); // Update the preview board instantly
      setShowToast(true);
      
    } catch (error) {
      console.error("Error posting notice:", error);
      alert("Failed to post notice. Is the server running?");
    } finally {
      setIsPosting(false);
    }
  };

  if (!activeUser || activeUser.role !== 'admin') {
    return <div style={{ padding: '50px', textAlign: 'center' }}>Unauthorized Access</div>;
  }

  const stats = {
    total: allComplaints.length,
    pending: allComplaints.filter(c => c.status === 'Pending').length,
    resolved: allComplaints.filter(c => c.status === 'Resolved').length
  };

  return (
    <div className="admin-dashboard" style={{ padding: '2.5rem' }}>
      
      <Toast 
        message="Notice securely broadcasted to all students!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--text-main)' }}>
          Admin <span style={{color: 'var(--brand-primary)'}}>Console</span>
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Real-time Maintenance Overview & Notice Board Management</p>
      </header>

      <div className="dashboard-hero-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', alignItems: 'start', marginBottom: '4rem' }}>
        
        {/* LEFT COLUMN: NOTICE EDITOR */}
        <div className="notice-editor-card" style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '700' }}>Update Notice Board</h2>
          <textarea 
            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', marginBottom: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
            value={notice}
            onChange={(e) => setNotice(e.target.value)}
            placeholder="Type official hostel update here..."
          />
          <button 
            onClick={handleSaveNotice}
            disabled={isPosting}
            style={{ background: 'var(--brand-primary)', color: 'white', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', cursor: isPosting ? 'not-allowed' : 'pointer', width: '100%', transition: 'all 0.2s' }}
          >
            {isPosting ? 'Broadcasting...' : 'Post to Green Board'}
          </button>
          
          <div style={{ marginTop: '2rem', transform: 'scale(0.8)', transformOrigin: 'top center' }}>
            <NoticeBoard note={liveNotice} />
          </div>
        </div>

        {/* RIGHT COLUMN: ADMIN STATS */}
        <div className="admin-status-column">
          <DashboardCards stats={stats} />
        </div>
      </div>

      {/* LOWER SECTION: GLOBAL FEED */}
      <div className="glass-card" style={{ marginTop: '2rem', background: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'var(--card-shadow)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-main)' }}>Global Live Feed</h2>
          <button 
            onClick={() => window.location.href = '/manage-complaints'}
            style={{background: 'none', color: 'var(--brand-primary)', border: 'none', fontWeight: '600', cursor: 'pointer'}}
          >
            Manage All →
          </button>
        </div>
        
        {isLoading ? (
          <p style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Syncing with Database...</p>
        ) : (
          <ComplaintTable complaints={allComplaints.slice(0, 8)} />
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;