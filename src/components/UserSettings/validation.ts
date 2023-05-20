import * as yup from 'yup';
import {
  FIELD_EMAIL,
  FIELD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
  PASSWORD_MIN_LENGTH,
} from '../../lib/validationUtils';

export const USER_SETTINGS_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(FIELD_EMAIL).required(FIELD_REQUIRED),
  forename: yup.string().required(FIELD_REQUIRED),
  phoneNumber: yup.string().required(FIELD_REQUIRED),
  surname: yup.string().required(FIELD_REQUIRED),
  newPassword: yup.string().min(8, PASSWORD_MIN_LENGTH),
  newPasswordAgain: yup
    .string()
    .oneOf([yup.ref('newPassword')], PASSWORDS_DO_NOT_MATCH)
    .when('newPassword', {
      is: (val: string | undefined) => val?.length ?? -1 > 0,
      then: (schema) => schema.required(FIELD_REQUIRED),
    }),
});
