import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false); // NEW: Toggle between Login and Register
  const [name, setName] = useState(''); // NEW: Needed for database
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setIsLoading(true);

    // Basic Validation
    if (!email || !password || (isRegistering && !name)) {
      setError('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    if (!email.endsWith('.ac.in') && !email.endsWith('.edu.in')) {
      setError('Invalid domain. Use .ac.in (Student) or .edu.in (Admin)');
      setIsLoading(false);
      return;
    }

    try {
      if (isRegistering) {
        // ==========================================
        // 1. REGISTER FLOW
        // ==========================================
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Registration failed');

        // Success! Switch them back to login mode automatically
        setSuccessMsg('Account created successfully! Please log in.');
        setIsRegistering(false);
        setPassword(''); // Clear password for security

      } else {
        // ==========================================
        // 2. LOGIN FLOW
        // ==========================================
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || 'Login failed');

        // Save the VIP Token to local storage so the browser remembers they are logged in
        localStorage.setItem('token', data.token);

        // Tell App.jsx who just logged in
        onLogin(data.user);
        
        // Shoot them to their specific dashboard based on DB role
        navigate(`/${data.user.role}-dashboard`);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-split-container">
        
        {/* LEFT SIDE: The Brand Story */}
        <div className="home-brand-panel">
          <div className="brand-content">
            <div className="logo-badge">HOSTEL<span>FLOW</span></div>
            <h1 className="hero-title">
              Campus Maintenance,<br/>
              <span className="text-highlight">Reimagined.</span>
            </h1>
            <p className="hero-subtitle">
              The smartest way to track, manage, and resolve hostel issues. Built for modern university life.
            </p>

            <div className="feature-list">
              <div className="feature-item"><span className="f-icon">⚡</span> Live status tracking</div>
              <div className="feature-item"><span className="f-icon">📌</span> Digital notice boards</div>
              <div className="feature-item"><span className="f-icon">🛠️</span> Instant staff routing</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Gateway */}
        <div className="home-login-panel">
          <div className="login-card-premium">
            <h2>{isRegistering ? 'Create Account' : 'Welcome Back'}</h2>
            <p className="login-desc">
              {isRegistering 
                ? 'Register your university credentials to get started.' 
                : 'Enter your university credentials to access your portal.'}
            </p>

            <form onSubmit={handleAuthSubmit} className="premium-form">
              
              {/* Only show Name field if they are Registering */}
              {isRegistering && (
                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="custom-input"
                    placeholder="e.g. Om Sharma"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(''); }}
                    required
                  />
                </div>
              )}

              <div className="form-group">
                <label>University Email</label>
                <input
                  type="email"
                  className={`custom-input ${error ? 'input-error' : ''}`}
                  placeholder="name@university.ac.in"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                />
              </div>

              <div className="form-group" style={{ marginTop: '1.5rem' }}>
                <label>Password</label>
                <input
                  type="password"
                  className={`custom-input ${error ? 'input-error' : ''}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(''); }}
                  required
                />
              </div>

              {/* Status Messages */}
              {error && <div className="error-msg" style={{ marginTop: '12px', color: '#ef4444', fontWeight: '600', fontSize: '0.9rem' }}>{error}</div>}
              {successMsg && <div className="success-msg" style={{ marginTop: '12px', color: '#10b981', fontWeight: '600', fontSize: '0.9rem' }}>{successMsg}</div>}

              <button type="submit" className="btn-primary w-100" style={{ marginTop: '2rem' }} disabled={isLoading}>
                {isLoading ? 'Processing...' : (isRegistering ? 'Register Account →' : 'Secure Sign In →')}
              </button>
            </form>

            <div className="login-footer" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                type="button" 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setSuccessMsg('');
                }} 
                style={{ background: 'none', border: 'none', color: 'var(--brand-primary)', fontWeight: '600', cursor: 'pointer', fontSize: '0.95rem' }}
              >
                {isRegistering ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
              </button>
              <p style={{ marginTop: '1.5rem' }}>System accepts Student <strong>(.ac.in)</strong> and Admin <strong>(.edu.in)</strong> domains.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;