import { BsPersonCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom';
import { CustomLink } from '../components/NavbarLink';
import '../styles/navbar/navbar.css'

const onLogoutClick = () => {
  console.log('Kirjaudu ulos clicked.');
};

export const Navbar = () => {
  // Don't show navbar on register and login view.
  const path = useLocation().pathname;
  return path !== '/' && path !== '/register' ? (
    <nav className="nav">
      <ul>
        <CustomLink to="/logbook">Täyttöpäiväkirja</CustomLink>
        <CustomLink to="/user">Omat tiedot</CustomLink>
        <CustomLink to="/management">Käyttäjän hallinta</CustomLink>
        <CustomLink to="/billing">Laskutus</CustomLink>

        <div className="user">
          {/* TODO get user info from state.*/}
          <BsPersonCircle size={35} /> Seppo Sukeltaja
          <button className="logout" onClick={onLogoutClick}>
            Kirjaudu ulos
          </button>
        </div>
      </ul>
    </nav>
  ) : null;
};
