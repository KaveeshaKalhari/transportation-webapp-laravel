import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'user', // Default role is 'user'
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setCredentials({ ...credentials, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/login', credentials);

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect based on role
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      if (err.response) {
        const { status, data } = err.response;
        if (status === 401) {
          setError('Invalid credentials. Please check your email or password.');
        } else if (status === 403) {
          setError(data.message || 'Unauthorized access.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />

        {/* Role Selection */}
        <div style={{ marginBottom: '20px', fontSize: '16px' }}>
          <label style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="role"
              value="user"
              checked={credentials.role === 'user'}
              onChange={handleRoleChange}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="admin"
              checked={credentials.role === 'admin'}
              onChange={handleRoleChange}
            />
            Admin
          </label>
        </div>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', fontSize: '16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Login
        </button>
      </form>

      {/* Show error message if login fails */}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

      <p style={{ textAlign: 'center', marginTop: '10px' }}>
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
};

export default Login;
