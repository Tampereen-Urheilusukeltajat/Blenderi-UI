import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import LogBook from './views/LogBook';
import { Navbar } from './views/Navbar';
import { User } from './views/UserSettings';

const App = (): JSX.Element => {
  return (
    <div>
      <Navbar />
      <main>
        <Container className="pt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<SignUp />} />
            <Route path="logbook" element={<LogBook />} />
            <Route path="user" element={<User />} />
          </Routes>
        </Container>
      </main>
    </div>
  );
};

export default App;
