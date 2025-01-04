import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../common/Inputs';
import { LOGIN_VALIDATION_SCHEMA } from './validation';
import { useLoginMutation } from '../../lib/queries/loginMutation';

type LoginFormFields = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const handleSuccessfulLogin = useCallback(() => {
    navigate('/logbook');
  }, [navigate]);

  const { mutate } = useLoginMutation(handleSuccessfulLogin);

  const handleSubmit = useCallback(
    async (formFields: LoginFormFields) => {
      mutate({
        email: formFields.email.trim(),
        password: formFields.password,
      });
    },
    [mutate],
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
        <Form onSubmit={handleSubmit}>
          <TextInput
            className="w-100"
            name="email"
            autoComplete="email"
            errorText={errors.email}
            label="Sähköpostiosoite"
          />
          <TextInput
            className="w-100"
            name="password"
            autoComplete="password"
            errorText={errors.password}
            label="Salasana"
            type="password"
          />
          <div className="d-flex justify-content-center">
            <PrimaryButton text="Kirjaudu sisään" type={ButtonType.submit} />
          </div>
        </Form>
      )}
    </Formik>
  );
};
