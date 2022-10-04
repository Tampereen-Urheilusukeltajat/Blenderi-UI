import React, { useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const SignUpFormHeader = () => {
  return <h3>Luo uusi käyttäjä</h3>;
};

const SignUpForm = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  const handleFirstNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };
      newValues['firstName'] = e.target.value;
      setValues(newValues);
    },
    [values]
  );

  const handleLastNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };
      newValues['lastName'] = e.target.value;
      setValues(newValues);
    },
    [values]
  );

  const handleUserNameInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };
      newValues['username'] = e.target.value;
      setValues(newValues);
    },
    [values]
  );

  const handlePasswordInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };
      newValues['password'] = e.target.value;
      setValues(newValues);
    },
    [values]
  );

  const handlePasswordConfirmInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValues = { ...values };
      newValues['passwordConfirm'] = e.target.value;
      setValues(newValues);
    },
    [values]
  );

  return (
    <div id="signUpForm" className="mt-5">
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
            onChange={handleUserNameInputChange}
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
        <Form.Group className="mb-5" controlId="formConfirmPassword">
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
        <div className="d-flex justify-content-center mb-5">
          <Button
            className="button"
            aria-label="Luo käyttäjä"
            variant="primary"
            type="submit"
          >
            Luo käyttäjä
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignUpForm;
