import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export const CustomLink = ({
  to,
  children,
  ...props
}: {
  to: string;
  children: string;
}) => {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
};
