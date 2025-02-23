import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetRequestMutation } from '../../lib/queries/passwordResetRequestMutation';
import { PASSWORD_RESET_REQUEST_VALIDATION_SCHEMA } from './validation';
import { TextInput } from '../common/Inputs';
import { Turnstile } from '@marsidev/react-turnstile';

type ResetFields = {
  email: string;
  turnstileToken: string;
};

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

export const PasswordResetRequestForm: React.FC = () => {
  if (TURNSTILE_SITE_KEY === undefined) {
    throw new Error('Turnstile initiation failed');
  }

  const navigate = useNavigate();

  const handleSuccessfulPasswordResetRequest = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const { mutate } = usePasswordResetRequestMutation(
    handleSuccessfulPasswordResetRequest,
  );

  const handleSubmit = useCallback(
    async (formFields: ResetFields) => {
      mutate({
        email: formFields.email.trim(),
        turnstileToken: formFields.turnstileToken,
      });
    },
    [mutate],
  );

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
          turnstileToken: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={PASSWORD_RESET_REQUEST_VALIDATION_SCHEMA}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {({ errors, handleSubmit, setFieldValue, values }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="email"
              autoComplete="email"
              errorText={errors.email}
              label="Sähköpostiosoite"
            />
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
            <div className="d-flex justify-content-center">
              <PrimaryButton
                text="Tilaa palautuslinkki"
                type={ButtonType.submit}
                disabled={!values.turnstileToken}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
