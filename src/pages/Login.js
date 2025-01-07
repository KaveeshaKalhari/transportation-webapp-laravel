import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for API requests

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // State to handle error messages
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email: credentials.email,
        password: credentials.password,
      });

      // Save the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        // Display specific error messages based on response status
        const { status } = err.response;
        if (status === 401) {
          setError('Invalid credentials. Please check your email or password.');
        } else if (status === 404) {
          setError('Login endpoint not found. Check the API route.');
        } else {
          setError('An error occurred. Please try again.');
        }
      } else {
        setError('Unable to connect to the server. Please try again later.');
      }
    }
  };

  const handleAdminLogin = () => {
    // Redirect to the Admin Page when the Admin button is clicked
    navigate('/admin');
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={credentials.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* Show error message if login fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <p>Don't have an account? <Link to="/register">Sign up</Link></p>

      {/* Admin Login Button */}
      <div style={{ marginTop: '20px' }}>
        <button
          onClick={handleAdminLogin}
          style={{
            backgroundColor: 'orange',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Login;
