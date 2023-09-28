import React from 'react';
import {
  linkIsActive,
  ResetPasswordForm,
} from '../../components/ResetPassword/ResetPasswordForm';
import styles from './ResetPassword.module.scss';
import { useLocation } from 'react-router-dom';

export const ResetPassword: React.FC = () => {
  const queries = useLocation().search;
  const params = new URLSearchParams(queries);
  const token = params.get('token');
  const userId = params.get('id');
  const tokenCreationTimestamp = params.get('timestamp');

  const linkIsInvalid =
    token === undefined ||
    token === null ||
    userId === undefined ||
    userId === null ||
    tokenCreationTimestamp === undefined ||
    tokenCreationTimestamp === null;

  if (linkIsInvalid) {
    return (
      <header className={styles.resetPassword}>
        <h1>Viallinen linkki</h1>
        <p>Yritit asettaa salasanaa viallisella linkillä.</p>
      </header>
    );
  }

  if (!linkIsActive(tokenCreationTimestamp)) {
    return (
      <header className={styles.resetPassword}>
        <h1>Vanhentunut linkki</h1>
        <p>Yritit asettaa salasanaa vanhentuneella linkillä.</p>
      </header>
    );
  }

  return (
    <div className={styles.resetPassword}>
      <header className={styles.header}>
        <h1>Salasanan palauttaminen</h1>
        <p>Aseta uusi salasana</p>
      </header>
      <ResetPasswordForm
        token={token}
        userId={userId}
        tokenCreationTimestamp={tokenCreationTimestamp}
      />
    </div>
  );
};
