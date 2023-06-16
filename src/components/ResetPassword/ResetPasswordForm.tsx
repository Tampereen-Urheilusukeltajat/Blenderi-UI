import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Buttons';
import { useNavigate, useLocation } from 'react-router-dom';
import { RESET_PASSWORD_VALIDATION_SCHEMA } from './validation';
import { useResetPasswordMutation } from '../../lib/queries/resetPasswordMutation';
import { toast } from 'react-toastify';
import { TextInput } from '../common/Inputs';

type SetPasswordFields = {
  password: string;
  repeatPassword: string;
};

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccessfulResetPassword = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const { mutate } = useResetPasswordMutation(handleSuccessfulResetPassword);

  const queries = useLocation().search;
  const params = new URLSearchParams(queries);
  const token = params.get('token');
  const userId = params.get('id');

  const handleSubmit = useCallback(
    async (formFields: SetPasswordFields) => {
      if (
        token === undefined ||
        token === null ||
        userId === undefined ||
        userId === null
      ) {
        toast.error('Yritit palauttaa salasanaa virheellisellä linkillä');
        return;
      }
      mutate({
        token,
        userId,
        password: formFields.password,
      });
      navigate('/login/');
    },
    [navigate, token, userId, mutate]
  );

  return (
    <div>
      <Formik
        initialValues={{
          password: '',
          repeatPassword: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={RESET_PASSWORD_VALIDATION_SCHEMA}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
            <PrimaryButton
              text="Aseta uusi salasana ja siirry kirjautumaan"
              type={ButtonType.submit}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};
