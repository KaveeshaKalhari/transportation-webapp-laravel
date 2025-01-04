import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute';
// import IPAddress from './components/IPAddress';

function App() {
  return (
    <Router>
      <div>
        {/* <h1>Welcome to the App</h1>
        <IPAddress /> */}
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<PrivateRoute role="user"><Dashboard /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute role="admin"><Admin /></PrivateRoute>} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;