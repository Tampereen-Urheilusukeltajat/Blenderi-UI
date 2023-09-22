import Container from 'react-bootstrap/Container';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Register } from './views/Register/Register';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { PageLoadingSpinner } from './components/Spinner';
import { DivingCylinderSetManagement } from './views/DivingCylinderSetSettings';
import { UserSettings } from './components/UserSettings/UserSettings';
import { BlenderLogbook } from './views/BlenderLogbook';
import { ProtectedRoute } from './components/common/Auth';
import { Logbook } from './views/Logbook';
import { FillEvents } from './views/FillEvents';
import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GDPR } from './views/GDPR';
import { FrontPage } from './views/FrontPage/FrontPage';
import { PasswordResetRequest } from './views/PasswordResetRequest/PasswordResetRequest';
import { ResetPassword } from './views/ResetPassword/ResetPassword';
import { Login } from './views/Login/Login';

const QUERY_CLIENT = new QueryClient();

const Content: React.FC = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const isFetching = useIsFetching();

  // Show spinner for 150ms even though loading has already finished
  // Why? If the request is fulfilled from the cache, the loader flashes on
  // screen for a really short time, and it creates this annoying flashing.
  // With 150ms user is able to perceive that there was a loading icon,
  // but it is still so fast that it doesn't bother the user.
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
      <Container className="pt-4 content">
        <Routes>
          {/* Public routes */}
          <Route element={<FrontPage />}>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path={'request-password-reset'}
              element={<PasswordResetRequest />}
            />
            <Route path={'reset-password'} element={<ResetPassword />} />
          </Route>
          <Route path="gdpr" element={<GDPR />} />

          {/* Private routes */}
          <Route element={<></>}>
            <Route
              path="diving-cylinder-set"
              element={
                <ProtectedRoute>
                  <DivingCylinderSetManagement />
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
                <ProtectedRoute blenderOnly>
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
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </main>
  );
};

const App = (): JSX.Element => {
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <ToastContainer className="toast-position" position={'top-right'} />
      <Content />
    </QueryClientProvider>
  );
};

export default App;
