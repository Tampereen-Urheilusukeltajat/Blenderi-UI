import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import LogBook from './views/LogBook';
import { Navbar } from './views/Navbar';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { PageLoadingSpinner } from './components/Spinner';
import { DivingCylinderSetManagement } from './views/DivingCylinderSetSettings';
import UserManagement from './views/UserManagement';
import { User } from './components/User/user';

const QUERY_CLIENT = new QueryClient();

const Content = (): JSX.Element => {
  const isFetching = useIsFetching();

  return (
    <main>
      {isFetching > 0 ? <PageLoadingSpinner /> : null}
      <Container className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="diving-cylinder-set"
            element={<DivingCylinderSetManagement />}
          />
          <Route path="management" element={<UserManagement />} />
          <Route path="register" element={<SignUp />} />
          <Route path="logbook" element={<LogBook />} />
          <Route path="user" element={<User />} />
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
