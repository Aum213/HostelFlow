import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import StudentDashboard from './pages/StudentDashboard';
import RaiseComplaint from './pages/RaiseComplaint';
import MyComplaints from './pages/MyComplaints';
import AdminDashboard from './pages/AdminDashboard';
import ManageComplaints from './pages/ManageComplaints';
import './App.css';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="App">
      <Navbar user={user} onLogout={handleLogout} />
      
      <main className="content-wrapper">
        <Routes>
          {/* THE NEW FRONT DOOR - Handles all logins now */}
          <Route path="/" element={!user ? <Home onLogin={handleLogin} /> : <Navigate to={`/${user.role}-dashboard`} />} />

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard user={user} />} />
          <Route path="/raise-complaint" element={<RaiseComplaint user={user} />} />
          <Route path="/my-complaints" element={<MyComplaints user={user} />} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard user={user} />} />
          <Route path="/manage-complaints" element={<ManageComplaints user={user} />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;