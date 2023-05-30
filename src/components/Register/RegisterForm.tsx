import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { useCallback } from 'react';

import { ButtonType, PrimaryButton } from '../common/Buttons';
import { styled } from 'styled-components';
import { useRegisterMutation } from '../../lib/queries/registerMutation';
import { TextInput } from '../common/Inputs';
import { REGISTER_VALIDATION_SCHEMA } from './validation';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 240px;
`;

type RegisterFormFields = {
  forename: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
};

export const RegisterForm: React.FC = () => {
  const { mutate } = useRegisterMutation();

  const handleSubmit = useCallback(
    async ({
      email,
      forename,
      password,
      phoneNumber,
      surname,
    }: RegisterFormFields) => {
      mutate({
        email: email.trim(),
        forename: forename.trim(),
        password,
        phoneNumber: phoneNumber.replaceAll(' ', ''),
        surname: surname.trim(),
      });
    },
    [mutate]
  );

  return (
    <Container>
      <h1>Luo uusi käyttäjä</h1>
      <Formik
        initialValues={{
          forename: '',
          surname: '',
          email: '',
          phoneNumber: '',
          password: '',
          repeatPassword: '',
        }}
        onSubmit={async (values) => handleSubmit(values)}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={REGISTER_VALIDATION_SCHEMA}
      >
        {({ handleSubmit, errors, handleChange }) => (
          <StyledForm onSubmit={handleSubmit}>
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
            <div className="d-flex justify-content-center mb-5">
              <PrimaryButton text="Luo käyttäjä" type={ButtonType.submit} />
            </div>
          </StyledForm>
        )}
      </Formik>
    </Container>
  );
};
