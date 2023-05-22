import React, { useCallback } from 'react';
import { SignInForm } from '../components/LoginForm/LoginForm';
import styled from 'styled-components';
import { DarkBlue, White, WhiteSmoke } from '../styles/Colors';
import { ReactComponent as Tayttopaikka } from '../svg/tayttopaikka.svg';
import { ReactComponent as D12 } from '../svg/D12.svg';
import { useNavigate } from 'react-router-dom';

const SignInContainer = styled('div')`
  background: ${White};
  border-radius: 12px;
  box-shadow: 0 0 20px #c3c3c3;
  display: flex;
  flex: 1;
  flex-direction: row;
  height: 100%;
  justify-content: space-between;
`;

const LoginPart = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 2rem;
  width: 50%;
`;

const LogoPart = styled('div')`
  align-items: center;
  border-left: 1px solid #c3c3c3;
  border-radius: 0 12px 12px 0;
  color: ${WhiteSmoke};
  background: ${DarkBlue};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 50%;
  padding: 2rem;
`;

const Logo = styled('div')`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 4rem;
  width: 100%;
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
  const navigate = useNavigate();
  const handleRegisterClick = useCallback(() => {
    navigate('/register');
  }, [navigate]);

  return (
    <SignInContainer>
      <LoginPart>
        <Header>
          <Title>Tervetuloa täyttöpaikalle!</Title>
          <p>
            Täyttöpaikka on Tampereen Urheilusukeltajien uusi täyttöpäiväkirja.
            Se korvaa vaiheittain paperisen esikuvansa vuosien 2023 ja 2024
            aikana. Järjestelmää kehitetään vapaaehtoisvoimin. Palvelun
            lähdekoodi on saatavilla vapaasti{' '}
            <a href="https://github.com/orgs/Tampereen-Urheilusukeltajat/">
              GitHubissa
            </a>
            .
          </p>
        </Header>
        <SignInForm onLoginSuccess={onLoginSuccess} />
        <div>
          <span>
            Voit rekistöröityä käyttäjäksi{' '}
            <a href="#" onClick={handleRegisterClick}>
              täältä
            </a>
            .
          </span>
        </div>
      </LoginPart>
      <LogoPart>
        <Logo>
          <D12 />
          <Tayttopaikka />
        </Logo>
      </LogoPart>
    </SignInContainer>
  );
};
