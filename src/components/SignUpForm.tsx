import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { postAsync } from '../lib/apiRequests/api';
import LoginResponse from './common/LoginResponse';
import LoginRequest from './common/LoginRequest';
import { useNavigate } from 'react-router-dom';
import SignUpResponse from './common/SignUpResponse';
import SignUpRequest from './common/SignUpRequest';

const SignUpFormHeader = (): JSX.Element => {
  return <h3>Luo uusi käyttäjä</h3>;
};

const SignUpForm = (): JSX.Element => {
  const navigate = useNavigate();

  // needed for /api/login
  let email = '';
  let pass = '';

  return (
    <div id="signUpForm" className="mt-5">
      <SignUpFormHeader />
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          password: '',
          repeatPassword: '',
        }}
        validate={() => {
          // TODO: Add validation checks
          const errors = {};
          return errors;
        }}
        onSubmit={async (values, actions) => {
          email = values.email;
          pass = values.password;
          postAsync<SignUpResponse, SignUpRequest>('/api/user/', {
            forename: values.firstName,
            surname: values.lastName,
            email: values.email,
            phone: values.phone,
            password: values.password,
          })
            .then((signUpResponse) => {
              // Needed to get user data
              document.cookie = `userId=${signUpResponse.data.id}; SameSite=None; Secure`;
              postAsync<LoginResponse, LoginRequest>('/api/login', {
                email,
                password: pass,
              })
                .then((loginResponse) => {
                  // Session tokens
                  document.cookie = `refreshToken=${loginResponse.data.refreshToken}; SameSite=None; Secure`;
                  document.cookie = `accessToken=${loginResponse.data.accessToken}; SameSite=None; Secure`;
                  navigate(-1);
                  navigate('/logbook');
                })
                .catch((err) => alert(err));
            })
            .catch((err) => alert(err));
        }}
      >
        {(form) => (
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Etunimi</Form.Label>
              <Form.Control
                aria-label="Etunimi"
                id="firstName"
                name="firstName"
                type="text"
                placeholder=""
                value={form.values.firstName}
                onChange={form.handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Anna etunimi.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sukunimi</Form.Label>
              <Form.Control
                aria-label="Sukunimi"
                id="lastName"
                name="lastName"
                type="text"
                placeholder=""
                value={form.values.lastName}
                onChange={form.handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Anna sukunimi.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sähköpostiosoite</Form.Label>
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
                Anna sähköpostiosoite.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Puhelinnumero</Form.Label>
              <Form.Control
                aria-label="Puhelinnumero"
                id="phone"
                name="phone"
                type="phone"
                placeholder=""
                value={form.values.phone}
                onChange={form.handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Anna sähköpostiosoite.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-5">
              <Form.Label>Salasana uudelleen</Form.Label>
              <Form.Control
                aria-label="Salasana uudelleen"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder=""
                value={form.values.repeatPassword}
                onChange={form.handleChange}
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
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
