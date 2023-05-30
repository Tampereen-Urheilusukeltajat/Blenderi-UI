import React from 'react';
import styled from 'styled-components';
import { DarkBlue, White, WhiteSmoke } from '../styles/Colors';
import { ReactComponent as Tayttopaikka } from '../svg/tayttopaikka.svg';
import { ReactComponent as D12 } from '../svg/D12.svg';
import { Outlet } from 'react-router-dom';

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

export const FrontPage: React.FC = () => (
  <SignInContainer>
    <>
      <Outlet />
    </>
    <LogoPart>
      <Logo>
        <D12 />
        <Tayttopaikka />
      </Logo>
    </LogoPart>
  </SignInContainer>
);
