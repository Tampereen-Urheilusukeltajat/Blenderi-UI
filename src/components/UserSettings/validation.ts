import * as yup from 'yup';
import {
  FIELD_EMAIL,
  FIELD_REQUIRED,
  PASSWORDS_DO_NOT_MATCH,
  PASSWORD_MIN_LENGTH,
  phoneUtil,
} from '../../lib/validationUtils';

export const USER_SETTINGS_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(FIELD_EMAIL).required(FIELD_REQUIRED),
  forename: yup.string().required(FIELD_REQUIRED),
  phoneNumber: yup
    .string()
    .required(FIELD_REQUIRED)
    .test(
      'phoneNumberCheck',
      'Anna puhelinnumero muodossa "+358 ..."',
      (phoneNumber) => {
        try {
          return phoneUtil.isValidNumberForRegion(
            phoneUtil.parse(phoneNumber),
            'FI',
          );
        } catch (error) {
          return false;
        }
      },
    ),
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
