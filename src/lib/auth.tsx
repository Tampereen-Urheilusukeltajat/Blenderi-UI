import React from 'react';
import { Navigate } from 'react-router-dom';

export const useAuth = (): boolean => {
  return true;
};

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (!auth) {
    // eslint-disable-next-line no-console
    console.log('Please login');
    return <Navigate to="/" />;
  }

  return <div className="protectedRoute">{children}</div>;
};
