import Container from 'react-bootstrap/Container';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './views/Login';
import SignUp from './views/SignUp';
import { Navbar } from './views/Navbar';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { PageLoadingSpinner } from './components/Spinner';
import { DivingCylinderSetManagement } from './views/DivingCylinderSetSettings';
import UserManagement from './views/UserManagement';
import { UserSettings } from './components/UserSettings/UserSettings';
import { BlenderLogbook } from './views/BlenderLogbook';
import { ProtectedRoute } from './components/common/Auth';
import { Logbook } from './views/Logbook';
import { FillEvents } from './views/FillEvents';
import { useEffect, useState } from 'react';
import { getTokenFromLocalStorage } from './lib/utils';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const QUERY_CLIENT = new QueryClient();

const Content = (): JSX.Element => {
  const [showSpinner, setShowSpinner] = useState(false);
  const isFetching = useIsFetching();

  // Show spinner for 150ms even though loading has already finished
  // Why? If the request is fullfilled from the cache, the loader flashes on
  // screen for a really small time and it creates this annoying flashing
  // With 150ms user is able to perceive that there was a loading icon,
  // but it is still so fast that it doesn't bother the user
  useEffect(() => {
    if (isFetching > 0) {
      setShowSpinner(true);
      return;
    }

    setTimeout(() => setShowSpinner(false), 150);
  }, [isFetching]);

  return (
    <main>
      {showSpinner ? <PageLoadingSpinner /> : null}
      <Container className="pt-4">
        <Routes>
          {/* Public routes */}
          <Route index element={<Login />} />
          <Route path="register" element={<SignUp />} />

          {/* Private routes */}
          <Route
            path="diving-cylinder-set"
            element={
              <ProtectedRoute>
                <DivingCylinderSetManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="management"
            element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="logbook"
            element={
              <ProtectedRoute>
                <Logbook />
              </ProtectedRoute>
            }
          />
          <Route
            path="blender-logbook"
            element={
              <ProtectedRoute>
                <BlenderLogbook />
              </ProtectedRoute>
            }
          />
          <Route
              path="fill-events"
              element={
                <ProtectedRoute>
                  <FillEvents />
                </ProtectedRoute>
              }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute>
                <UserSettings />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </main>
  );
};

const App = (): JSX.Element => {
  // If access token exist, user has authenticated
  const authenticated = getTokenFromLocalStorage('accessToken');

  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      {authenticated ? <Navbar /> : null}
      <Content />
      <ToastContainer className="toast-position" position={'top-right'} />
    </QueryClientProvider>
  );
};

export default App;
