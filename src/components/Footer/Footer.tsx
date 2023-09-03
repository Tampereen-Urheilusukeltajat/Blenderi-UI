import React from 'react';
import styles from './Footer.module.scss';
import { ReactComponent as Tayttopaikka } from '../../svg/tayttopaikka.svg';

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
        <a href="" aria-disabled="true" className={styles.item}>
          Ohjeet
        </a>
      </div>
    </div>
  );
};
