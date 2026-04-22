import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data.user, res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <p className="subtitle">Enter your credentials to continue</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Address</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        {error && <div className="error-msg">{error}</div>}
        <button type="submit" className="btn-primary">Sign In</button>
      </form>
      <div className="auth-footer">
        <Link to="/forgot-password">Forgot Password?</Link>
        <br/><br/>
        Don't have an account? <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}
