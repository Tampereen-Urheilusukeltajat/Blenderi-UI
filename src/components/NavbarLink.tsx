import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const CustomLink = ({
  to,
  children,
  ...props
}: {
  to: string;
  children: string;
}): JSX.Element => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive != null ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
