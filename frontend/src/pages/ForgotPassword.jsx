import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMsg('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMsg(res.data.message);
      setTimeout(() => navigate('/reset-password', { state: { email } }), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <p className="subtitle">Enter your email to receive a reset OTP</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        {error && <div className="error-msg">{error}</div>}
        {msg && <div className="success-msg">{msg}</div>}
        <button type="submit" className="btn-primary">Send OTP</button>
      </form>
      <div className="auth-footer">
        Remember your password? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}
