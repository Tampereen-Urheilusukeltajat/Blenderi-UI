import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Register } from './views/Register/Register';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { PageLoadingSpinner } from './components/Spinner';
import { DivingCylinderSetManagement } from './views/DivingCylinderSetSettings/DivingCylinderSetSettings';
import { UserSettings } from './components/UserSettings/UserSettings';
import { BlenderLogbook } from './views/BlenderLogbook';
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
import { PrivateContent } from './components/common/PrivateContent';
import { Footer } from './components/Footer/Footer';
import { InvoicePage } from './views/Invoice/Invoice';

const QUERY_CLIENT = new QueryClient();

const BaseElement: React.FC = () => (
  <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-between">
    <Outlet />
    <Footer />
  </div>
);

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

    setTimeout(() => {
      setShowSpinner(false);
    }, 150);
  }, [isFetching]);

  return (
    <main>
      {showSpinner ? <PageLoadingSpinner /> : null}
      <Routes>
        <Route element={<BaseElement />}>
          {/* Public routes */}
          <Route element={<FrontPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              path={'request-password-reset'}
              element={<PasswordResetRequest />}
            />
            <Route path={'reset-password'} element={<ResetPassword />} />
          </Route>
          <Route path="gdpr" element={<GDPR />} />

          {/* Private routes */}
          <Route element={<PrivateContent />}>
            <Route
              path="diving-cylinder-set"
              element={<DivingCylinderSetManagement />}
            />
            <Route path="logbook" element={<Logbook />} />

            <Route path="fill-events" element={<FillEvents />} />
            <Route path="user" element={<UserSettings />} />
          </Route>

          {/* Blender only views */}
          <Route element={<PrivateContent blenderOnly />}>
            <Route path="blender-logbook" element={<BlenderLogbook />} />
          </Route>

          {/* Admin only views */}
          <Route element={<PrivateContent adminOnly />}>
            <Route path="invoice" element={<InvoicePage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/logbook" />} />
        </Route>
      </Routes>
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
