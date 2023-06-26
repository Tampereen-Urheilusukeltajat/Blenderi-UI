import * as yup from 'yup';
import { FIELD_EMAIL, FIELD_REQUIRED } from '../../lib/validationUtils';

export const PASSWORD_RESET_REQUEST_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(FIELD_EMAIL).required(FIELD_REQUIRED),
});
