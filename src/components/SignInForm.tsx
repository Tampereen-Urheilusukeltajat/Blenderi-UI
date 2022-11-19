import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../index.css';
import { Formik } from 'formik';
import { postAsync } from '../lib/apiRequests/api';

const SignInFormHeader = (): JSX.Element => {
  return <h3 className="pb-5">Kirjaudu sisään</h3>;
};

const SignInForm = (): JSX.Element => {
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
        onSubmit={async (values, actions) => {
          postAsync('/api/user/', {
            email: values.email,
            password: values.password,
          })
            .then((response) => alert(JSON.stringify(response, null, 2)))
            .catch((err) => alert(err));
        }}
      >
        {(form) => (
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Käyttäjätunnus</Form.Label>
              <Form.Control
                aria-label="Sähköpostiosoite"
                id="email"
                name="email"
                type="email"
                placeholder=""
                value={form.values.email}
                onChange={form.handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Anna käyttäjätunnus.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-5">
              <Form.Label>Salasana</Form.Label>
              <Form.Control
                aria-label="Salasana"
                id="password"
                name="password"
                type="password"
                placeholder=""
                value={form.values.password}
                onChange={form.handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Anna salasana.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                id="signInButton"
                className="mb-5 button"
                aria-label="Kirjaudu sisään"
                variant="primary"
                type="submit"
              >
                Kirjaudu sisään
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignInForm;
