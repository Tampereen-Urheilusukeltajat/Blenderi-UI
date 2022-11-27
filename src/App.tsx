import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import { BlenderLogBook } from './views/BlenderLogBook';
import { Navbar } from './views/Navbar';
import {
  QueryClient,
  QueryClientProvider,
  useIsFetching,
} from '@tanstack/react-query';
import { PageLoadingSpinner } from './components/Spinner';
import { DivingCylinderSetManagement } from './views/DivingCylinderSetSettings';
import UserManagement from './views/UserManagement';
import { useEffect, useState } from 'react';
import getCookie from './components/common/GetCookie';
import { getUser, User } from './lib/apiRequests/userRequests';
import { AXIOS_CONFIG } from './lib/apiRequests/api';
import { UserSettings } from './components/User/User';
import { LogBook } from './views/LogBook';

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
          <Route path="blender-logbook" element={<BlenderLogBook />} />
          <Route path="user" element={<UserSettings />} />
        </Routes>
      </Container>
    </main>
  );
};

const App = (): JSX.Element => {
  const [userId, setUserId] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    if (currentUser === undefined) {
      const accessToken = getCookie('accessToken');
      const id = getCookie('userId');
      AXIOS_CONFIG.headers = { Authorization: `Bearer ${accessToken}` };
      setUserId(id);
      getUser(userId, accessToken)
        .then((userResponse) => {
          setCurrentUser(userResponse.data);
        })
        .catch((err) => alert(err));
    }
  }, [userId, currentUser]);
  return (
    <QueryClientProvider client={QUERY_CLIENT}>
      <Navbar />
      <Content />
    </QueryClientProvider>
  );
};

export default App;
