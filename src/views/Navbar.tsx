import { BsPersonCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { TertiaryButton } from '../components/common/Buttons';
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
            <div className="iconLink">
              <BsPersonCircle size={35} />
              <span>Seppo Sukeltaja</span>
            </div>
          </CustomLink>
          <TertiaryButton onClick={onLogoutClick} text="Kirjaudu ulos" />
        </div>
      </ul>
    </nav>
  );
};
