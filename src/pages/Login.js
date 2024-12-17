import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the dashboard when the form is submitted
    navigate('/dashboard'); // Navigate to the Dashboard page
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
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Sign up</Link></p>

      {/* Admin Login Button */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handleAdminLogin} style={{ backgroundColor: 'orange', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Admin Login
        </button>
      </div>
    </div>
  );
};

export default Login;
