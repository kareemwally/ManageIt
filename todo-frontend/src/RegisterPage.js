import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Use the same Auth.css file for shared styles

const API_BASE_URL = 'http://localhost:3000';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE_URL}/api/register`, { username, email, password });
      alert('Registration successful! You can now log in.');
      window.location.href = '/login';
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed.');
    }
  };

  return (
    <div className="auth-page d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-block mt-4">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;

