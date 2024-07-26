import React, { useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import { Formik } from 'formik';
import { ButtonType, PrimaryButton } from '../common/Button/Buttons';
import { useNavigate } from 'react-router-dom';
import { usePasswordResetRequestMutation } from '../../lib/queries/passwordResetRequestMutation';
import { PASSWORD_RESET_REQUEST_VALIDATION_SCHEMA } from './validation';
import { TextInput } from '../common/Inputs';

type ResetFields = {
  email: string;
};

export const PasswordResetRequestForm: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccessfulPasswordResetRequest = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const { mutate } = usePasswordResetRequestMutation(
    handleSuccessfulPasswordResetRequest,
  );

  const handleSubmit = useCallback(
    async (formFields: ResetFields) => {
      mutate({
        email: formFields.email.trim(),
      });
    },
    [mutate],
  );

  return (
    <div>
      <Formik
        initialValues={{
          email: '',
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={PASSWORD_RESET_REQUEST_VALIDATION_SCHEMA}
        onSubmit={async (values) => handleSubmit(values)}
      >
        {({ errors, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <TextInput
              name="email"
              autoComplete="email"
              errorText={errors.email}
              label="Sähköpostiosoite"
            />
            <div className="d-flex justify-content-center">
              <PrimaryButton
                text="Tilaa palautuslinkki"
                type={ButtonType.submit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
