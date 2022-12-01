import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { TertiaryButton } from '../components/common/Buttons';
import { CustomLink } from '../components/NavbarLink';
import { useUserQuery } from '../lib/queries/userQuery';
import { getUserIdFromAccessToken } from '../lib/utils';
import '../styles/navbar/navbar.css';

const UserIconButton: React.FC = () => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const { data: user } = useUserQuery(userId);

  return (
    <div className="iconLink">
      <BsPersonCircle size={35} />
      <span>
        {user?.forename} {user?.surname}
      </span>
    </div>
  );
};

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
  if (path === '/' || path === '/register') {
    return null;
  }

  return (
    <nav className="nav">
      <ul className="container">
        <div className="leftPart">
          <CustomLink to="/logbook">Paineilmatäyttö</CustomLink>
          <CustomLink to="/blender-logbook">Happihäkki</CustomLink>
          <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>

          {/* Not part of the MVP
          <CustomLink to="/management">Käyttäjän hallinta</CustomLink>
          <CustomLink to="/billing">Laskutus</CustomLink> */}
        </div>
        <div className="user">
          <CustomLink to="/user">
            <UserIconButton />
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
