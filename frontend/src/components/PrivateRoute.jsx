import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Chat from './chat';

const PrivateRoute = () => {
  const isAuthenticated = () => {
    const token = useSelector((state) => state.authorization.userToken);
    return !!token;
  };
  
  return isAuthenticated() ? <Chat /> : <Navigate to="/login" />;
};

export default PrivateRoute;
