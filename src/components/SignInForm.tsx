import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import '../index.css';
import '../styles/user/user.css';
import { Field, Formik } from 'formik';
import { postAsync } from '../lib/apiRequests/api';
import LoginResponse from './common/LoginResponse';
import LoginRequest from './common/LoginRequest';
import { ButtonType, PrimaryButton } from './common/Buttons';
import { useNavigate } from 'react-router-dom';

type SignInFormFiels = {
  email: string;
  password: string;
};

const SignInFormHeader = (): JSX.Element => {
  return <h3 className="pb-5">Kirjaudu sisään</h3>;
};

const SignInForm = (): JSX.Element => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (formFields: SignInFormFiels) => {
      const loginResponse = await postAsync<LoginResponse, LoginRequest>(
        '/api/login/',
        {
          email: formFields.email,
          password: formFields.password,
        }
      );

      if (loginResponse.data !== undefined) {
        localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
        localStorage.setItem('accessToken', loginResponse.data.accessToken);
        navigate('/logbook');
      }
    },
    [navigate]
  );

  return (
    <div id="signInForm">
      <SignInFormHeader />
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validate={() => {
          // TODO: Add validation checks
          const errors = {};
          return errors;
        }}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {(form) => (
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Sähköpostiosoite</Form.Label>
              <Field
                className="form-control"
                aria-label="Sähköpostiosoite"
                id="email"
                name="email"
                type="email"
                placeholder=""
                value={form.values.email}
                onChange={form.handleChange}
                autoComplete="on"
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Anna käyttäjätunnus.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Salasana</Form.Label>
              <Field
                className="form-control"
                aria-label="Salasana"
                id="password"
                name="password"
                type="password"
                placeholder=""
                value={form.values.password}
                onChange={form.handleChange}
                autoComplete="on"
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Anna salasana.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <PrimaryButton text="Kirjaudu sisään" type={ButtonType.submit} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
