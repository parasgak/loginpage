import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div className="dashboard">
      <nav className="nav-bar">
        <div className="nav-logo">
          <h2>AuthApp Dashboard</h2>
        </div>
        <button onClick={handleLogout} className="btn-outline">Logout</button>
      </nav>
      
      <div className="profile-card">
        <h3>User Profile Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="profile-item"><strong>Name:</strong> {user.name}</div>
          <div className="profile-item"><strong>Email:</strong> {user.email}</div>
          <div className="profile-item"><strong>Mobile:</strong> {user.mobile}</div>
          <div className="profile-item"><strong>Gender:</strong> {user.gender}</div>
          <div className="profile-item"><strong>State:</strong> {user.state}</div>
          <div className="profile-item"><strong>Pin Code:</strong> {user.pincode}</div>
          <div className="profile-item"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</div>
          <div className="profile-item"><strong>Status:</strong> <span style={{ color: '#22c55e' }}>Verified</span></div>
        </div>
      </div>
    </div>
  );
}
