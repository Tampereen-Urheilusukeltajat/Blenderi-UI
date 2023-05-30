import React from 'react';
import { SignInForm } from '../components/Login/LoginForm';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Content = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 2rem;
  width: 50%;
`;

const Header = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  text-align: justify;
`;

const Title = styled('h1')`
  font-size: 32px;
`;

export type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <Content>
      <Header>
        <Title>Tervetuloa täyttöpaikalle!</Title>
        <p>
          Täyttöpaikka on Tampereen Urheilusukeltajien uusi täyttöpäiväkirja. Se
          korvaa vaiheittain paperisen esikuvansa vuosien 2023 ja 2024 aikana.
          Järjestelmää kehitetään vapaaehtoisvoimin ja sen lähdekoodi on
          saatavilla vapaasti{' '}
          <a href="https://github.com/orgs/Tampereen-Urheilusukeltajat/">
            GitHubissa
          </a>
          .
        </p>
      </Header>
      <SignInForm onLoginSuccess={onLoginSuccess} />
      <div>
        <span>
          Voit rekistöröityä käyttäjäksi <Link to={'/register'}>täältä</Link>.
        </span>
      </div>
    </Content>
  );
};
