import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Buttons';
import { useNavigate } from 'react-router-dom';
import { LoginProps } from '../../views/Login';
import { TextInput } from '../common/Inputs';
import { LOGIN_VALIDATION_SCHEMA } from './validation';
import { useLoginMutation } from '../../lib/queries/loginMutation';
import { styled } from 'styled-components';

type SignInFormFields = {
  email: string;
  password: string;
};

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 220px;
`;

export const SignInForm: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const handleSuccessfulLogin = useCallback(() => {
    onLoginSuccess();
    navigate('/logbook');
  }, [navigate, onLoginSuccess]);

  const { mutate } = useLoginMutation(handleSuccessfulLogin);

  const handleSubmit = useCallback(
    async (formFields: SignInFormFields) => {
      mutate({
        email: formFields.email.trim(),
        password: formFields.password,
      });
    },
    [mutate]
  );

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validateOnChange={false}
      validateOnBlur={false}
      validationSchema={LOGIN_VALIDATION_SCHEMA}
      onSubmit={async (values) => handleSubmit(values)}
    >
      {({ errors, handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <TextInput
            name="email"
            type="email"
            autoComplete="email"
            errorText={errors.email}
            label="Sähköpostiosoite"
          />
          <TextInput
            name="password"
            autoComplete="password"
            errorText={errors.password}
            label="Salasana"
            type="password"
          />
          <div className="d-flex justify-content-center">
            <PrimaryButton text="Kirjaudu sisään" type={ButtonType.submit} />
          </div>
        </StyledForm>
      )}
    </Formik>
  );
};
