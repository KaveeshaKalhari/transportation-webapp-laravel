import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that passwords match
    if (password !== passwordConfirmation) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Send request to backend API
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation, // Send password confirmation as well
      });

      // Save the token to localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after successful signup
      navigate('/dashboard');
    } catch (err) {
      // Handle errors from the backend, possibly showing validation error messages
      if (err.response) {
        setError(err.response.data.message || 'Error registering user');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Signup</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignupPage;
