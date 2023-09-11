import React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const PrivateRoutesLayout = () => {
  const location = useLocation();
  const { user } = useAuthContext();

  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to='/authentication' state={{ from: location }} replace />
  );
};

export default PrivateRoutesLayout;
