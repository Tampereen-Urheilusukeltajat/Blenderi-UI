import { PhoneNumberUtil } from 'google-libphonenumber';

export const phoneUtil = new PhoneNumberUtil();

// Messages
export const FIELD_REQUIRED = 'Kenttä on pakollinen';
export const FIELD_EMAIL = 'Sähköpostin muoto on virheellinen';
export const PASSWORD_MIN_LENGTH =
  'Salasanan on oltava vähintään 8 merkin mittainen';
export const PASSWORDS_DO_NOT_MATCH = 'Salasanat eivät vastaa toisiaan';
export const FIELD_NUMBER = 'Annetun arvon on oltava numero';
export const ATLEAST_ONE = 'Valitse ainakin yksi vaihtoehto';
