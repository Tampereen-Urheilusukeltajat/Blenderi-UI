import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { TertiaryButton } from '../common/Button/Buttons';
import { getUserRoles } from '../../lib/utils';
import styles from './Navbar.module.scss';
import { Navbar as BootNavbar, Container, Nav } from 'react-bootstrap';
import { CustomLink } from './CustomLink';

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
    <BootNavbar expand="lg">
      <Container>
        <span className="navbar-brand d-block d-lg-none d-xl-none text-white">
          Täyttöpaikka
        </span>
        <BootNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootNavbar.Collapse id="basic-navbar-nav">
          <div className="d-flex flex-row justify-content-between w-100">
            <Nav>
              <CustomLink to="/logbook">Paineilmatäyttö</CustomLink>

              {(isAdmin || isBlender) && (
                <CustomLink to="/blender-logbook">Happihäkki</CustomLink>
              )}

              <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>

              <CustomLink to="/fill-events">Täyttöhistoria</CustomLink>
            </Nav>
            <Nav>
              <div className={styles.user}>
                <CustomLink to="/user">
                  <div className={styles.iconLink}>
                    <BsPersonCircle size={35} />
                    <span>Omat tiedot</span>
                  </div>
                </CustomLink>
              </div>
              <TertiaryButton
                className={styles.logout}
                onClick={handleLogoutButtonClick}
                text="Kirjaudu ulos"
              />
            </Nav>
          </div>
        </BootNavbar.Collapse>
      </Container>
    </BootNavbar>
  );
};
