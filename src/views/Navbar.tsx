import { FC } from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { CustomLink } from '../components/NavbarLink';
import { User } from '../lib/apiRequests/userRequests';
import '../styles/navbar/navbar.css';

const onLogoutClick = (): void => {
  // eslint-disable-next-line no-console
  console.log('Log out button clicked.');
};

type NavbarCompProps = {
  user: User | undefined;
};

export const Navbar: FC<NavbarCompProps> = (props): JSX.Element | null => {
  // TODO refactor to to see if user is logged in.
  // Don't show navbar on register and login view.
  const path = useLocation().pathname;
  if (path === '/' || path === '/register') {
    return null;
  }

  return (
    <nav className="nav">
      <ul>
        <CustomLink to="/logbook">Täyttöpäiväkirja</CustomLink>
        <CustomLink to="/diving-cylinder-set">Omat pullot</CustomLink>
        <CustomLink to="/management">Käyttäjän hallinta</CustomLink>
        <CustomLink to="/billing">Laskutus</CustomLink>

        <div className="user">
          {/* TODO get user info from state. */}
          <BsPersonCircle size={35} /> {props.user?.forename ?? ''}{' '}
          {props.user?.surname ?? ''}
          <button className="logout" onClick={onLogoutClick}>
            Kirjaudu ulos
          </button>
        </div>
      </ul>
    </nav>
  );
};
