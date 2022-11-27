import React from 'react';
import { Navigate } from 'react-router-dom';
import { tokenExpired } from './utils';

type AccessToken = {
  exp: number;
  iat: number;
  id: string;
};

type RefreshToken = AccessToken & {
  isRefreshToken: boolean;
  jti: string;
};

const validateAuthentication = (): boolean => {
  const accessToken = localStorage.getItem('accessToken')?.split('.') ?? '';
  const refreshToken = localStorage.getItem('refreshToken')?.split('.') ?? '';

  // Valid tokens always have three parts
  if (accessToken.length !== 3 || refreshToken.length !== 3) return false;

  const accessPayload: AccessToken = JSON.parse(window.atob(accessToken[1]));
  const refreshPayload: RefreshToken = JSON.parse(window.atob(refreshToken[1]));

  if (tokenExpired(accessPayload.exp)) {
    if (tokenExpired(refreshPayload.exp)) {
      return false;
    }
  }

  return true;
};

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authenticated = validateAuthentication();

  // Tokens have expired, forward to login
  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <div className="protectedRoute">{children}</div>;
};
