import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { TertiaryButton } from '../components/common/Buttons';
import { CustomLink } from '../components/NavbarLink';
import { getUserRoles } from '../lib/utils';
import '../styles/navbar/navbar.css';

const NAVBAR_BLACKLIST = [
  '/',
  '/register',
  '/reset-password',
  '/request-password-reset',
];

export const Navbar = (): JSX.Element | null => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogoutButtonClick = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    // Invalidate React Query cache
    queryClient.clear();

    navigate('/');
  }, [navigate, queryClient]);

  const path = useLocation().pathname;
  if (NAVBAR_BLACKLIST.includes(path)) {
    return null;
  }

  const { isAdmin, isBlender } = getUserRoles();

  return (
    <nav className="nav">
      <ul className="container">
        <div className="leftPart">
          <CustomLink to="/logbook">Paineilmatäyttö</CustomLink>
          {isBlender || isAdmin ? (
            <CustomLink to="/blender-logbook">Happihäkki</CustomLink>
          ) : null}
          <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>
          <CustomLink to="/fill-events">Täyttötapahtumat</CustomLink>
        </div>
        <div className="user">
          <CustomLink to="/user">
            <div className="iconLink">
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
