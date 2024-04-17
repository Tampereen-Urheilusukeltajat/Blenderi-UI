import React from 'react';
import { Outlet } from 'react-router-dom';

import { Navbar } from '../Navbar/Navbar';
import { type PrivateRouteProps, ProtectedRoute } from './Auth';
import { Container } from 'react-bootstrap';

type PrivateContentProps = Omit<PrivateRouteProps, 'children'>;

export const PrivateContent: React.FC<PrivateContentProps> = ({
  adminOnly,
  blenderOnly,
}) => {
  return (
    <ProtectedRoute adminOnly={adminOnly} blenderOnly={blenderOnly}>
      <Navbar />
      <Container className="justify-self-start pt-4">
        <Outlet />
      </Container>
    </ProtectedRoute>
  );
};
