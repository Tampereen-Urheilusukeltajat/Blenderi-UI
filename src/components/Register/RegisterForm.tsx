import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useCallback } from 'react';

import { ButtonType, PrimaryButton } from '../common/Button/Buttons';
import { useRegisterMutation } from '../../lib/queries/registerMutation';
import { TextInput } from '../common/Inputs';
import { REGISTER_VALIDATION_SCHEMA } from './validation';
import { Turnstile } from '@marsidev/react-turnstile';

type RegisterFormFields = {
  forename: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  turnstileToken: string;
};

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const RegisterForm: React.FC = () => {
  if (TURNSTILE_SITE_KEY === undefined) {
    throw new Error('Turnstile initiation failed');
  }

  const { mutate } = useRegisterMutation();

  const handleSubmit = useCallback(
    async ({
      email,
      forename,
      password,
      phoneNumber,
      surname,
      turnstileToken,
    }: RegisterFormFields) => {
      mutate({
        email: email.trim(),
        forename: forename.trim(),
        password,
        phoneNumber: phoneNumber.replaceAll(' ', ''),
        surname: surname.trim(),
        turnstileToken,
      });
    },
    [mutate],
  );

  return (
    <div>
      <h1>Luo uusi käyttäjä</h1>
      <Formik
        initialValues={{
          forename: '',
          surname: '',
          email: '',
          phoneNumber: '',
          password: '',
          repeatPassword: '',
          turnstileToken: '',
        }}
        onSubmit={async (values) => handleSubmit(values)}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={REGISTER_VALIDATION_SCHEMA}
      >
        {({ handleSubmit, errors, handleChange, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="forename"
              autoComplete="given-name"
              errorText={errors.forename}
              label="Etunimi"
            />
            <TextInput
              name="surname"
              autoComplete="family-name"
              errorText={errors.surname}
              label="Sukunimi"
            />
            <TextInput
              aria-label="Sähköpostiosoite"
              name="email"
              type="email"
              autoComplete="email"
              errorText={errors.email}
              label="Sähköpostiosoite"
            />
            <TextInput
              name="phoneNumber"
              autoComplete="tel"
              errorText={errors.phoneNumber}
              label="Puhelinnumero"
              type="tel"
            />
            <TextInput
              name="password"
              autoComplete="new-password"
              errorText={errors.password}
              label="Salasana"
              type="password"
            />
            <TextInput
              name="repeatPassword"
              autoComplete="new-password"
              errorText={errors.repeatPassword}
              label="Salasana uudestaan"
              type="password"
            />
            <Form.Group className="flex row">
              <Form.Label>
                <div className="d-flex flex-row gx-5">
                  <Form.Check
                    aria-label="Hyväksyn tietosuojaselosteen"
                    id="acceptDataProtectionPolicy"
                    name="acceptDataProtectionPolicy"
                    onChange={handleChange}
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
            {/*
              By default Turnstile is hidden and will only show up to user if
              it requires user input (aka challenges user)
            */}
            <Turnstile
              siteKey={TURNSTILE_SITE_KEY}
              onSuccess={async (token) =>
                setFieldValue('turnstileToken', token)
              }
              options={{
                appearance: 'interaction-only',
                theme: 'light',
              }}
            />
            <div className="d-flex justify-content-center mb-5">
              <PrimaryButton text="Luo käyttäjä" type={ButtonType.submit} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
