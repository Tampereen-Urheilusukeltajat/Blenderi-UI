import { BsArrowLeftCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { DarkBlue } from '../styles/Colors';
import { RegisterForm } from '../components/Register/RegisterForm';

const Content = styled('div')`
  display: flex;
  flex-direction: row;
  height: 100%;
  justify-content: space-around;
  padding: 2rem;
  width: 50%;
`;

const StyledLink = styled(Link)`
  align-items: center;
  display: flex;
  position: absolute;
  padding: 1rem 0 0 1rem;

  svg {
    border-radius: 1rem;
    border: 0px solid green;
    color: ${DarkBlue};
    min-height: 2rem;
    min-width: 2rem;
  }
`;

export const Register: React.FC = () => {
  return (
    <>
      <StyledLink to={'/'}>
        <BsArrowLeftCircle />
      </StyledLink>
      <Content>
        <RegisterForm />
      </Content>
    </>
  );
};
