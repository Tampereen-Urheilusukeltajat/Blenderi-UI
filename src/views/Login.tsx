import React from 'react';
import { SignInForm } from '../components/LoginForm/LoginForm';

export type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return <SignInForm onLoginSuccess={onLoginSuccess} />;
};
