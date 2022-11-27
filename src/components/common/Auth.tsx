import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../../lib/auth';

import { PageLoadingSpinner } from '../Spinner';

type PrivateRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  // Checks authentication first time user loads into protectedRoute.
  // Should be able to handle 99% of situations, but we might want to
  // look at this later if we want to run this effect every time protectedRoute
  // is loaded
  useEffect(() => {
    const validateAuth = async (): Promise<void> => {
      const authenticated = await isAuthenticated();
      setAuthenticated(authenticated);
      setLoading(false);
    };

    validateAuth().catch(() => <Navigate to="/" />);
  }, []);

  return (
    <div className="protectedRoute">
      {loading ? <PageLoadingSpinner /> : null}
      {!loading && !authenticated ? <Navigate to="/" /> : null}
      {children}
    </div>
  );
};
