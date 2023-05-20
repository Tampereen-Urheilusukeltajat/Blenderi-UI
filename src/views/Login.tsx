import React from 'react';
import { SignInForm } from '../components/LoginForm/LoginForm';
import styled from 'styled-components';
import { DarkBlue, White, WhiteSmoke } from '../styles/Colors';
import { ReactComponent as Tayttopaikka } from '../svg/tayttopaikka.svg';
import { ReactComponent as D12 } from '../svg/D12.svg';

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
  justify-content: center;
  height: 100%;
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
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export type LoginProps = {
  onLoginSuccess: () => void;
};

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  return (
    <SignInContainer>
      <LoginPart>
        <SignInForm onLoginSuccess={onLoginSuccess} />
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
