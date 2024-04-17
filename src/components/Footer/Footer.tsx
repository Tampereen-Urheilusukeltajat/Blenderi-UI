import React from 'react';
import styles from './Footer.module.scss';
import Tayttopaikka from '../../svg/tayttopaikka.svg?react';
import happihakkiInstructions from '../../Files/happihakki-instructions.pdf';

export const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.logo}>
          <Tayttopaikka />
        </div>
      </div>
      <div className={styles.row}>
        <a href="https://taursu.fi" className={styles.item}>
          Tampereen Urheilusukeltajat ry
        </a>
        <a href="mailto:palaute@tayttopaikka.fi" className={styles.item}>
          Ota yhteyttä
        </a>
      </div>
      <div className={styles.row}>
        <a href="/gdpr" className={styles.item}>
          Tietosuojaseloste
        </a>
        <a href={happihakkiInstructions} download className={styles.item}>
          Happihäkin ohjeet
        </a>
      </div>
    </div>
  );
};
