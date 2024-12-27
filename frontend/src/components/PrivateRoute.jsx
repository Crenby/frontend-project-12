import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const token = useSelector((state) => state.authorization.userToken);
  const isAuthenticated = () => !!token;
  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
