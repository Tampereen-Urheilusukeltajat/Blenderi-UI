import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';
import { PrivateRouteProps, ProtectedRoute } from './Auth';

type PrivateContentProps = Omit<PrivateRouteProps, 'children'>;

export const PrivateContent: React.FC<PrivateContentProps> = ({
  adminOnly,
  blenderOnly,
}) => {
  return (
    <ProtectedRoute adminOnly={adminOnly} blenderOnly={blenderOnly}>
      <Navbar />
      <Outlet />
    </ProtectedRoute>
  );
};
