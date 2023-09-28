import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Buttons';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD_VALIDATION_SCHEMA } from './validation';
import { useResetPasswordMutation } from '../../lib/queries/resetPasswordMutation';
import { toast } from 'react-toastify';
import { TextInput } from '../common/Inputs';

type SetPasswordFields = {
  password: string;
  repeatPassword: string;
};

// Check that link is not expired yet
export const linkIsActive = (timestamp: string): boolean => {
  const tokenCreationTime = new Date(timestamp);

  // tokens expire in 10 minutes
  const tokenExpirationTime = new Date(
    tokenCreationTime.getTime() + 10 * 60000
  );

  return new Date() < tokenExpirationTime;
};

export const ResetPasswordForm: React.FC<{
  token: string;
  userId: string;
  tokenCreationTimestamp: string;
}> = ({ token, userId, tokenCreationTimestamp }) => {
  const navigate = useNavigate();

  const handleSuccessfulResetPassword = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const { mutate } = useResetPasswordMutation(handleSuccessfulResetPassword);

  const handleSubmit = useCallback(
    (formFields: SetPasswordFields) => {
      if (!linkIsActive(tokenCreationTimestamp)) {
        toast.error('Yritit palauttaa salasanaa vanhentuneella linkillä');
        return;
      }

      mutate({
        token,
        userId,
        password: formFields.password,
      });
    },
    [token, userId, mutate, tokenCreationTimestamp]
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
        onSubmit={handleSubmit}
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
