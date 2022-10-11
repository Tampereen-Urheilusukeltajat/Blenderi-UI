import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import LogBook from './views/LogBook';

function App() {
  return (
    <div>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="logbook" element={<LogBook />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
