import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import UserManagement from './views/UserManagement';
import { Navbar } from './views/Navbar';

const App = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="/management" element={<UserManagement />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
