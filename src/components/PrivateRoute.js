import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('role');
  const token = localStorage.getItem('token');

  if (!token || userRole !== role) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;