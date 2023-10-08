import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import styles from './Navbar.module.scss';

export const CustomLink = ({
  to,
  children,
  ...props
}: {
  to: string;
  children: string | JSX.Element;
}): JSX.Element => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive !== null ? styles.active : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
