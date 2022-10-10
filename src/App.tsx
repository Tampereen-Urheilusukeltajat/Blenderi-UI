import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import { Navbar } from './views/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
