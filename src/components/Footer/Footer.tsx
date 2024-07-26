import React from 'react';
import styles from './Footer.module.scss';
import Tayttopaikka from '../../svg/tayttopaikka.svg?react';
import happihakkiInstructions from '../../Files/happihakki-instructions.pdf';

export const Footer: React.FC = () => (
  <div className={styles.footer}>
    <div className={styles.row}>
      <div className={styles.logo}>
        <Tayttopaikka />
      </div>
    </div>
    <div className={styles.row}>
      <a href="https://taursu.fi" target="_blank" className={styles.item}>
        Tampereen Urheilusukeltajat ry
      </a>
      <a href="mailto:palaute@tayttopaikka.fi" className={styles.item}>
        Ota yhteyttä
      </a>
    </div>
    <div className={styles.row}>
      <a href="/gdpr" target="_blank" className={styles.item}>
        Tietosuojaseloste
      </a>
      <a
        href={happihakkiInstructions}
        target="_blank"
        download
        className={styles.item}
      >
        Happihäkin ohjeet
      </a>
    </div>
  </div>
);
