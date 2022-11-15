import { BsPersonCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { CustomLink } from '../components/NavbarLink';
import '../styles/navbar/navbar.css';

const onLogoutClick = (): void => {
  // eslint-disable-next-line no-console
  console.log('Log out button clicked.');
};

export const Navbar = (): JSX.Element | null => {
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
          <CustomLink to="/user">
            <div className="iconLink">
              <BsPersonCircle size={35} />
              {/* TODO get user info from state. */}
              <span>Seppo Sukeltaja</span>
            </div>
          </CustomLink>
          <button className="logout" onClick={onLogoutClick}>
            Kirjaudu ulos
          </button>
        </div>
      </ul>
    </nav>
  );
};
