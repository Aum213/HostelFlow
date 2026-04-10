import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import '../styles/RaiseComplaint.css';

const categories = [
  { id: 'Electricity', icon: '⚡' },
  { id: 'Plumbing', icon: '🚰' },
  { id: 'Water', icon: '💧' },
  { id: 'Wi-Fi', icon: '🛜' },
  { id: 'Furniture', icon: '🪑' },
  { id: 'Cleanliness', icon: '🧹' },
  { id: 'Other', icon: '📌' }
];

const RaiseComplaint = ({ user }) => {
  const navigate = useNavigate();
  const activeUser = user || JSON.parse(localStorage.getItem('user'));

  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevents double-clicking

  const [formData, setFormData] = useState({
    hostel: '',
    category: 'Electricity',
    roomNumber: '',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.hostel) {
      alert("Please select your hostel.");
      return;
    }

    setIsSubmitting(true);

    const newComplaint = {
      ticketId: String(Math.floor(1000 + Math.random() * 9000)), // Matches our Backend Schema
      ...formData,
      studentName: activeUser?.name || "Student",
      studentEmail: activeUser?.email,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    try {
      // THE MAGIC BRIDGE: Sending data to our Node.js server
      const response = await fetch('https://hostelflow-z0xs.onrender.com/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newComplaint),
      });

      if (!response.ok) {
        throw new Error('Server rejected the request');
      }

      // SHOW TOAST, WAIT 1.5s, THEN REDIRECT
      setShowToast(true);
      setTimeout(() => {
        navigate('/student-dashboard');
      }, 1500);

    } catch (error) {
      console.error("Error submitting ticket:", error);
      alert("Failed to connect to the server. Make sure your backend is running!");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="raise-complaint-wrapper">
      
      <Toast 
        message="Ticket submitted successfully!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />

      <div className="request-card-container">
        
        {/* LEFT SIDE: Information Panel */}
        <div className="request-info-panel">
          <h2>Maintenance Request</h2>
          <p>Submit a ticket and our campus staff will resolve it as quickly as possible.</p>
          
          <div className="process-steps">
            <div className="step">
              <div className="step-icon">1</div>
              <div>
                <h4>Submit Ticket</h4>
                <p>Provide detailed information.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">2</div>
              <div>
                <h4>Staff Assigned</h4>
                <p>Admin routes it to the right team.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-icon">3</div>
              <div>
                <h4>Resolution</h4>
                <p>Track live updates on your dashboard.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Form */}
        <div className="request-form-panel">
          <form onSubmit={handleSubmit} className="premium-form">
            
            <div className="form-group-row">
              <div className="form-group" style={{ flex: 1 }}>
                <label>Hostel Block</label>
                <select 
                  className="custom-input"
                  value={formData.hostel} 
                  onChange={(e) => setFormData({...formData, hostel: e.target.value})}
                  required
                >
                  <option value="" disabled>-- Select --</option>
                  <option value="Hostel A">Hostel A</option>
                  <option value="Hostel B">Hostel B</option>
                  <option value="Hostel C">Hostel C</option>
                  <option value="Hostel D">Hostel D</option>
                </select>
              </div>

              <div className="form-group" style={{ flex: 1 }}>
                <label>Room Number</label>
                <input 
                  type="text" 
                  className="custom-input"
                  placeholder="e.g. A-302" 
                  required 
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                />
              </div>
            </div>

            {/* VISUAL CATEGORY SELECTOR */}
            <div className="form-group">
              <label>Issue Category</label>
              <div className="category-grid">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-btn ${formData.category === cat.id ? 'active' : ''}`}
                    onClick={() => setFormData({...formData, category: cat.id})}
                  >
                    <span className="cat-icon">{cat.icon}</span>
                    <span className="cat-label">{cat.id}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea 
                className="custom-input"
                placeholder="Please describe the exact issue (e.g., The tap in the bathroom is leaking continuously)..." 
                rows="4" 
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => navigate(-1)} className="btn-secondary" disabled={isSubmitting}>Cancel</button>
              <button type="submit" className="btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Ticket →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RaiseComplaint;