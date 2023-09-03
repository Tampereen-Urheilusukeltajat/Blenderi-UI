import React from 'react';
import { LoginForm } from '../../components/Login/LoginForm';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';

export type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <div className={styles.login}>
      <header className={styles.header}>
        <h1>Tervetuloa täyttöpaikalle!</h1>
        <p>
          Täyttöpaikka on Tampereen Urheilusukeltajien uusi täyttöpäiväkirja. Se
          korvaa vaiheittain paperisen esikuvansa vuosien 2023 ja 2024 aikana.
          Järjestelmää kehitetään vapaaehtoisvoimin ja sen lähdekoodi on
          saatavilla vapaasti{' '}
          <a href="https://github.com/orgs/Tampereen-Urheilusukeltajat/">
            GitHubissa
          </a>
          .
        </p>
      </header>
      <LoginForm onLoginSuccess={onLoginSuccess} />
      <div>
        <span>
          <Link to={'/register'}>Rekistöröidy käyttäjäksi</Link>
          <br />
          <Link to={'/request-password-reset'}>Unohditko salasanasi?</Link>
        </span>
      </div>
    </div>
  );
};
