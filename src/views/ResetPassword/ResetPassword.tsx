import React from 'react';
import { ResetPasswordForm } from '../../components/ResetPassword/ResetPasswordForm';
import styles from './ResetPassword.module.scss';

export const ResetPassword: React.FC = () => {
  return (
    <div className={styles.resetPassword}>
      <header className={styles.header}>
        <h1>Salasanan palauttaminen</h1>
        <p>Aseta uusi salasana</p>
      </header>
      <ResetPasswordForm />
    </div>
  );
};
