import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SignUpFormHeader() {
  return <h3>Luo uusi käyttäjä</h3>;
}

function SignUpForm() {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const handleFirstNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      firstName: event.target.value,
    }));
  };

  const handleLastNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      lastName: event.target.value,
    }));
  };

  const handleUserIdInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      userId: event.target.value,
    }));
  };

  const handlePasswordInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      password: event.target.value,
    }));
  };

  const handlePasswordConfirmInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.persist();
    setValues((values) => ({
      ...values,
      passwordConfirm: event.target.value,
    }));
  };

  return (
    <div>
      <SignUpFormHeader />
      <Form>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>Etunimi</Form.Label>
          <Form.Control
            aria-label="Etunimi"
            type="text"
            placeholder=""
            value={values.firstName}
            onChange={handleFirstNameInputChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Anna etunimi.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formLastName">
          <Form.Label>Sukunimi</Form.Label>
          <Form.Control
            aria-label="Sukunimi"
            type="text"
            placeholder=""
            value={values.lastName}
            onChange={handleLastNameInputChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Anna sukunimi.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>Käyttäjätunnus</Form.Label>
          <Form.Control
            aria-label="Käyttäjätunnus"
            type="text"
            placeholder=""
            value={values.username}
            onChange={handleUserIdInputChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Anna käyttäjätunnus.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
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
        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Salasana uudelleen</Form.Label>
          <Form.Control
            aria-label="Salasana uudelleen"
            type="password"
            placeholder=""
            value={values.passwordConfirm}
            onChange={handlePasswordConfirmInputChange}
            required
          ></Form.Control>
          <Form.Control.Feedback type="invalid">
            Toista salasana uudelleen.
          </Form.Control.Feedback>
        </Form.Group>
        <Button aria-label="Luo käyttäjä" variant="primary" type="submit">
          Luo käyttäjä
        </Button>
      </Form>
    </div>
  );
}

export default SignUpForm;
