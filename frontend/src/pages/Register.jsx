import React, { useState } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', mobile: '', gender: '', state: '', pincode: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/register', formData);
      navigate('/verify-otp', { state: { email: formData.email } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container" style={{ maxWidth: '600px' }}>
      <h2>Create Account</h2>
      <p className="subtitle">Join our secure platform today</p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>Mobile</label>
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required style={{ background: 'var(--input-bg)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.85rem 1rem', borderRadius: '12px', fontSize: '1rem', outline: 'none' }}>
              <option value="" disabled>Select Gender</option>
              <option value="Male" style={{color:'black'}}>Male</option>
              <option value="Female" style={{color:'black'}}>Female</option>
              <option value="Other" style={{color:'black'}}>Other</option>
            </select>
          </div>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>State</label>
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 45%' }}>
            <label>Pin Code</label>
            <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
          </div>
          <div className="form-group" style={{ flex: '1 1 100%' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <button type="submit" className="btn-primary">Sign Up</button>
      </form>
      <div className="auth-footer">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    </div>
  );
}
