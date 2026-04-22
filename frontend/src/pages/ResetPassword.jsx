import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', { email, otp, newPassword });
      setMsg(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <p className="subtitle">Enter the OTP sent to {email || 'your email'} and your new password.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>OTP Code</label>
          <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} required />
        </div>
        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}
        <button type="submit" className="btn-primary">Reset Password</button>
      </form>
    </div>
  );
}
