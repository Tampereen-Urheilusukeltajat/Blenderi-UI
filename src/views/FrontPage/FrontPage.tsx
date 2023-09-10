import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { ReactComponent as Tayttopaikka } from '../../svg/tayttopaikka.svg';
import { ReactComponent as D12 } from '../../svg/D12.svg';
import { Outlet, Link, useLocation } from 'react-router-dom';
import styles from './FrontPage.module.scss';

export const FrontPage: React.FC = () => {
  const [showBackButton, setShowBackButton] = useState(false);
  const location = useLocation();
  useEffect(() => setShowBackButton(location.pathname !== '/'), [location]);

  return (
    <div className={styles.content}>
      <div className={styles.contentPart}>
        {showBackButton && (
          <Link className={styles.styledLink} to={'/'}>
            <BsArrowLeftCircle />
          </Link>
        )}
        <Outlet />
      </div>
      <aside className={styles.logoPart}>
        <div className={styles.logo}>
          <D12 />
          <Tayttopaikka />
        </div>
      </aside>
    </div>
  );
};
