import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../lib/auth';
import { getUserRoles } from '../../lib/utils';

import { PageLoadingSpinner } from '../Spinner';

export type PrivateRouteProps = {
  children: React.ReactNode;
  userOnly?: boolean;
  blenderOnly?: boolean;
  adminOnly?: boolean;
};

export const ProtectedRoute: React.FC<PrivateRouteProps> = ({
  children,
  userOnly = false,
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
        const { isAdmin, isBlender, isUser, isAdvancedBlender } =
          getUserRoles();

        if (userOnly && !(isUser || isAdmin)) {
          toast.error('Sinua ei ole merkattu seuran jäseneksi');
          navigate('/diving-cylinder-set');
          return;
        }

        if (
          (blenderOnly && !(isBlender || isAdvancedBlender || isAdmin)) ||
          (adminOnly && !isAdmin)
        ) {
          toast.error('Ei oikeutta näkymään');
          navigate('/logbook');
        }
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate, blenderOnly, adminOnly, userOnly]);

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate('/login');
    }
  }, [authenticated, loading, navigate]);

  return loading || !authenticated ? (
    <PageLoadingSpinner />
  ) : (
    <div>{children}</div>
  );
};
