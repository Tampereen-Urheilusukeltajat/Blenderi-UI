import * as yup from 'yup';
import {
  FIELD_REQUIRED,
  PASSWORD_MIN_LENGTH,
  PASSWORDS_DO_NOT_MATCH,
} from '../../lib/validationUtils';

export const RESET_PASSWORD_VALIDATION_SCHEMA = yup.object().shape({
  password: yup
    .string()
    .required(FIELD_REQUIRED)
    .min(8, PASSWORD_MIN_LENGTH)
    .required(FIELD_REQUIRED),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], PASSWORDS_DO_NOT_MATCH)
    .when('password', {
      is: (val: string | undefined) => val?.length ?? -1 > 0,
      then: (schema) => schema.required(FIELD_REQUIRED),
    }),
});
