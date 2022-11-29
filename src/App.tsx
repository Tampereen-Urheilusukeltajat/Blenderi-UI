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

const QUERY_CLIENT = new QueryClient();

const Content = (): JSX.Element => {
  const isFetching = useIsFetching();

  return (
    <main>
      {isFetching > 0 ? <PageLoadingSpinner /> : null}
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
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <Navbar />
      <Content />
    </QueryClientProvider>
  );
};

export default App;
