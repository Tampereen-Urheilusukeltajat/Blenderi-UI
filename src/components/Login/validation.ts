import * as yup from 'yup';
import { FIELD_EMAIL, FIELD_REQUIRED } from '../../lib/validationUtils';

export const LOGIN_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(FIELD_EMAIL).required(FIELD_REQUIRED),
  password: yup.string().required(FIELD_REQUIRED),
});
