import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function VerifyOTP() {
  const [otp, setOtp] = useState('');
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
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      setMsg(res.data.message);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Email</h2>
      <p className="subtitle">We sent a 6-digit OTP to {email || 'your email'}. Check terminal if using ethereal.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter OTP</label>
          <input type="text" value={otp} onChange={e=>setOtp(e.target.value)} required />
        </div>
        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}
        <button type="submit" className="btn-primary">Verify OTP</button>
      </form>
    </div>
  );
}
