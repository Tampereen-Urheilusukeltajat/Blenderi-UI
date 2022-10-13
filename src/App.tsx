import React from 'react';
import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import SignUp from './views/SignUp';
import UserControl from './views/UserControl'

function App() {
  return (
    <div>
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<SignUp />} />
          <Route path="/admin" element={<UserControl />}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
