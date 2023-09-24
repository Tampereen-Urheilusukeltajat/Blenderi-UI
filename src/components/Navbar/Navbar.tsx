import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { TertiaryButton } from '../common/Buttons';
import { CustomLink } from '../NavbarLink';
import { getUserRoles } from '../../lib/utils';
import styles from './Navbar.module.scss';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogoutButtonClick = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Invalidate React Query cache
    queryClient.clear();

    navigate('/');
  }, [navigate, queryClient]);

  const { isAdmin, isBlender } = getUserRoles();

  return (
    <nav className={styles.nav}>
      <ul>
        <div className={styles.leftPart}>
          <CustomLink to="/logbook">Paineilmatäyttö</CustomLink>
          {isBlender || isAdmin ? (
            <CustomLink to="/blender-logbook">Happihäkki</CustomLink>
          ) : null}
          <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>
          <CustomLink to="/fill-events">Täyttöhistoria</CustomLink>
        </div>
        <div className={styles.user}>
          <CustomLink to="/user">
            <div className={styles.iconLink}>
              <BsPersonCircle size={35} />
              <span>Omat tiedot</span>
            </div>
          </CustomLink>
          <TertiaryButton
            onClick={handleLogoutButtonClick}
            text="Kirjaudu ulos"
          />
        </div>
      </ul>
    </nav>
  );
};
