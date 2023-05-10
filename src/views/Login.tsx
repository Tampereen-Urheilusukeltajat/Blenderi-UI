import React from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../components/SignInForm';

export type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <div>
      <div
        id="signInContainer"
        className="h-100 d-flex align-items-center justify-content-center mt-5"
      >
        <SignInForm onLoginSuccess={onLoginSuccess} />
      </div>
      <div className="text-center">
        <Link to="register">Luo uusi käyttäjä</Link>
      </div>
    </div>
  );
};
