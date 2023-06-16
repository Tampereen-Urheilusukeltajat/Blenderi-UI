import React from 'react';
import { PasswordResetRequestForm } from '../../components/PasswordResetRequest/PasswordResetRequestForm';
import styles from './PasswordResetRequest.module.scss';

export const PasswordResetRequest: React.FC = () => {
  return (
    <div className={styles.passwordResetRequest}>
      <header className={styles.header}>
        <h1>Salasanan palauttaminen</h1>
        <p>
          Tilaa salasanan palautuslinkki syöttämällä käyttäjätunnukseesi
          liitetty sähköpostiosoite.
        </p>
      </header>
      <PasswordResetRequestForm />
    </div>
  );
};
