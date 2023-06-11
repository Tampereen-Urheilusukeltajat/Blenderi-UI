import React from 'react';
import { ReactComponent as Tayttopaikka } from '../../svg/tayttopaikka.svg';
import { ReactComponent as D12 } from '../../svg/D12.svg';
import { Outlet } from 'react-router-dom';
import styles from './FrontPage.module.scss';

export const FrontPage: React.FC = () => (
  <div className={styles.content}>
    <Outlet />
    <aside className={styles.logoPart}>
      <div className={styles.logo}>
        <D12 />
        <Tayttopaikka />
      </div>
    </aside>
  </div>
);
