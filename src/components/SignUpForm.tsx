import Form from 'react-bootstrap/Form';
import { Field, Formik } from 'formik';
import { postAsync } from '../lib/apiRequests/api';
import { useCallback } from 'react';

import '../styles/user/user.css';
import { ButtonType, PrimaryButton } from './common/Buttons';
import { useNavigate } from 'react-router-dom';
import { LoginRequest, LoginResponse } from './SignInForm';
import { SignUpProps } from '../views/SignUp';

const SignUpFormHeader = (): JSX.Element => {
  return <h3>Luo uusi käyttäjä</h3>;
};

type SignUpRequest = {
  forename: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
};

type SignUpResponse = {
  id: string;
  email: string;
  phone: string;
  forename: string;
  surname: string;
  isAdmin: boolean;
  isBlender: boolean;
  archivedAt: string;
};

type SignUpFormFields = {
  forename: string;
  surname: string;
  email: string;
  phone: string;
  password: string;
};

const SignUpForm: React.FC<SignUpProps> = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (values: SignUpFormFields) => {
      const signUpResponse = await postAsync<SignUpResponse, SignUpRequest>(
        '/api/user/',
        values
      );

      if (signUpResponse.data !== undefined) {
        const loginResponse = await postAsync<LoginResponse, LoginRequest>(
          '/api/login/',
          {
            email: values.email,
            password: values.password,
          }
        );
        if (loginResponse.data !== undefined) {
          localStorage.setItem('refreshToken', loginResponse.data.refreshToken);
          localStorage.setItem('accessToken', loginResponse.data.accessToken);
          onRegisterSuccess();
          navigate('/logbook');
        }
      }
    },
    [navigate, onRegisterSuccess]
  );

  return (
    <div id="signUpForm" className="mt-5">
      <SignUpFormHeader />
      <Formik
        initialValues={{
          forename: '',
          surname: '',
          email: '',
          phone: '',
          password: '',
          repeatPassword: '',
        }}
        validate={() => {
          // TODO: Add validation checks
          return {};
        }}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {(form) => (
          <Form onSubmit={form.handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Etunimi</Form.Label>
              <Field
                className="form-control"
                aria-label="Etunimi"
                id="forename"
                name="forename"
                type="text"
                placeholder=""
                value={form.values.forename}
                onChange={form.handleChange}
                autoComplete="on"
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Anna etunimi.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sukunimi</Form.Label>
              <Field
                className="form-control"
                aria-label="Sukunimi"
                id="surname"
                name="surname"
                type="text"
                placeholder=""
                value={form.values.surname}
                onChange={form.handleChange}
                autoComplete="on"
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Anna sukunimi.
              </Form.Control.Feedback>
            </Form.Group>
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
                Anna sähköpostiosoite.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Puhelinnumero</Form.Label>
              <Field
                className="form-control"
                aria-label="Puhelinnumero"
                id="phone"
                name="phone"
                type="phone"
                placeholder=""
                value={form.values.phone}
                onChange={form.handleChange}
                autoComplete="on"
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Anna sähköpostiosoite.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
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
            <Form.Group className="mb-5">
              <Form.Label>Salasana uudelleen</Form.Label>
              <Field
                className="form-control"
                aria-label="Salasana uudelleen"
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder=""
                value={form.values.repeatPassword}
                onChange={form.handleChange}
                required
              ></Field>
              <Form.Control.Feedback type="invalid">
                Toista salasana uudelleen.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="flex row">
              <Form.Label>
                <div className="d-flex flex-row gx-5">
                  <Form.Check
                    aria-label="Hyväksyn tietosuojaselosteen"
                    id="acceptDataProtectionPolicy"
                    name="acceptDataProtectionPolicy"
                    onChange={form.handleChange}
                    required
                  />
                  <span>
                    Hyväksyn{' '}
                    <a href="/gdpr" target="_blank">
                      tietosuojaselosteen
                    </a>
                  </span>
                </div>
              </Form.Label>
            </Form.Group>
            <div className="d-flex justify-content-center mb-5">
              <PrimaryButton text="Luo käyttäjä" type={ButtonType.submit} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
