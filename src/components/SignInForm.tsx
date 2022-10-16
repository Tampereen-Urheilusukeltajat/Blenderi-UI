import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import '../index.css';

const SignInFormHeader = (): JSX.Element => {
  return <h3 className="pb-5">Kirjaudu sisään</h3>;
};

const SignInForm = (): JSX.Element => {
  const [values, setValues] = useState({
    userId: '',
    password: '',
  });

  const handleUserIdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    setValues((values) => ({
      ...values,
      userId: event.target.value,
    }));
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  return (
    <div id="signInForm">
      <SignInFormHeader />
      <Form>
        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>Käyttäjätunnus</Form.Label>
          <Form.Control
            aria-label="Käyttäjätunnus"
            type="text"
            placeholder=""
            value={values.userId}
            onChange={handleUserIdInputChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Anna käyttäjätunnus.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-5" controlId="formPassword">
          <Form.Label>Salasana</Form.Label>
          <Form.Control
            aria-label="Salasana"
            type="password"
            placeholder=""
            value={values.password}
            onChange={handlePasswordInputChange}
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
    </div>
  );
};

export default SignInForm;
