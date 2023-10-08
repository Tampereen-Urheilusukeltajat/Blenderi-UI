import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../lib/auth';
import { getUserRoles } from '../../lib/utils';

import { PageLoadingSpinner } from '../Spinner';

export type PrivateRouteProps = {
  children: React.ReactNode;
  blenderOnly?: boolean;
  adminOnly?: boolean;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  children,
  blenderOnly = false,
  adminOnly = false,
}) => {
  const navigate = useNavigate();
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

    validateAuth()
      .then(() => {
        const { isAdmin, isBlender } = getUserRoles();
        if (
          (blenderOnly && !(isBlender || isAdmin)) ||
          (adminOnly && !isAdmin)
        ) {
          toast.error('Ei oikeutta näkymään');
          return navigate('/logbook');
        }
      })
      .catch(() => navigate('/'));
  }, [navigate, blenderOnly, adminOnly]);

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/');
    }
  }, [authenticated, loading, navigate]);

  return loading || !authenticated ? (
    <PageLoadingSpinner />
  ) : (
    <div>{children}</div>
  );
};
