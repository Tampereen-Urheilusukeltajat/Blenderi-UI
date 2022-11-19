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
import { FC, useEffect, useState } from 'react';
import getCookie from './components/common/GetCookie';
import { getUser, User } from './lib/apiRequests/userRequests';
import { AXIOS_CONFIG } from './lib/apiRequests/api';
import { User } from './components/User/user';

const QUERY_CLIENT = new QueryClient();

type ContentCompProps = {
  user: User | undefined;
};

const Content: FC<ContentCompProps> = (props): JSX.Element => {
  const isFetching = useIsFetching();

  return (
    <main>
      {isFetching > 0 ? <PageLoadingSpinner /> : null}
      <Container className="pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="diving-cylinder-set"
            element={<DivingCylinderSetManagement user={props.user} />}
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
      <Navbar user={currentUser} />
      <Content user={currentUser} />
    </QueryClientProvider>
  );
};

export default App;
