import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Hello BlenderilaskuriUI!</h1>
      <Link to="register">Luo uusi käyttäjä</Link>
    </div>
  );
}

export default Home;
