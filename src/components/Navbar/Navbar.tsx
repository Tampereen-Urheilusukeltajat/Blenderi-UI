import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { TertiaryButton } from '../common/Button/Buttons';
import { getUserFullName, getUserRoles } from '../../lib/utils';
import styles from './Navbar.module.scss';
import { Navbar as BootNavbar, Container, Nav } from 'react-bootstrap';
import { CustomLink } from './CustomLink';
import { AdminDropdown } from './AdminDropdown';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogoutButtonClick = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Invalidate React Query cache
    queryClient.clear();

    navigate('/login');
  }, [navigate, queryClient]);

  const { isAdmin, isBlender, isAdvancedBlender, isUser } = getUserRoles();
  const fullName = getUserFullName();

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
              {(isUser || isAdmin) && (
                <CustomLink to="/logbook">Paineilmatäyttö</CustomLink>
              )}

              {(isUser || isAdmin) &&
                (isBlender || isAdvancedBlender || isAdmin) && (
                  <CustomLink to="/blender-logbook">Happihäkki</CustomLink>
                )}

              <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>

              <CustomLink to="/fill-events">Täyttöhistoria</CustomLink>

              {isAdmin && (
                <AdminDropdown text="Ylläpito">
                  <CustomLink
                    className={styles.dropdownLink}
                    to="/admin/invoice"
                  >
                    Laskutus
                  </CustomLink>
                  <CustomLink className={styles.dropdownLink} to="/admin/users">
                    Käyttäjät
                  </CustomLink>
                  {/* <CustomLink
                    className={styles.dropdownLink}
                    to="/admin/filling-history"
                  >
                    Täyttöhistoria
                  </CustomLink> */}
                </AdminDropdown>
              )}
            </Nav>
            <Nav className="d-flex gap-2">
              <div className={styles.user}>
                <CustomLink to="/user">
                  <div className={styles.iconLink}>
                    <BsPersonCircle size={35} />
                    <span>{fullName}</span>
                  </div>
                </CustomLink>
              </div>
              <div className={styles.logout}>
                <TertiaryButton
                  onClick={handleLogoutButtonClick}
                  text="Kirjaudu ulos"
                />
              </div>
            </Nav>
          </div>
        </BootNavbar.Collapse>
      </Container>
    </BootNavbar>
  );
};
