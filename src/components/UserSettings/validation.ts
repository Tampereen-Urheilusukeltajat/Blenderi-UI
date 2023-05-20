import * as yup from 'yup';

export const FIELD_REQUIRED = 'Kenttä on pakollinen';
const FIELD_EMAIL = 'Sähköpostin muoto on virheellinen';

export const USER_SETTINGS_VALIDATION_SCHEMA = yup.object().shape({
  email: yup.string().email(FIELD_EMAIL).required(FIELD_REQUIRED),
  forename: yup.string().required(FIELD_REQUIRED),
  phoneNumber: yup.string().required(FIELD_REQUIRED),
  surname: yup.string().required(FIELD_REQUIRED),
  newPassword: yup
    .string()
    .min(8, 'Uuden salasanan on oltava vähintään 8 merkin mittainen'),
  newPasswordAgain: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Salasanat eivät vastaa toisiaan')
    .when('newPassword', {
      is: (val: string | undefined) => val?.length ?? -1 > 0,
      then: (schema) => schema.required(FIELD_REQUIRED),
    }),
});
