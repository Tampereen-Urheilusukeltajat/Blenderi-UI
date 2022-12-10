import * as yup from 'yup';
import { FIELD_REQUIRED } from '../UserSettings/validation';

const FIELD_NUMBER = 'Annetun arvon on oltava numero';

export const NEW_CYLINDER_SET_VALIDATION_SCHEMA = yup.object().shape({
  divingCylinderSetName: yup.string().required(FIELD_REQUIRED).min(1).max(255),
  divingCylinders: yup
    .array()
    .of(
      yup.object().shape({
        volume: yup
          .number()
          .required(FIELD_REQUIRED)
          .positive()
          .max(100, 'Maks. 100')
          .typeError(FIELD_NUMBER),
        material: yup
          .string()
          .required(FIELD_REQUIRED)
          .max(32, 'Maks. 32 merkkiä.'),
        pressure: yup
          .number()
          .required(FIELD_REQUIRED)
          .positive()
          .max(500)
          .typeError(FIELD_NUMBER),
        serialNumber: yup
          .string()
          .required(FIELD_REQUIRED)
          .max(64, 'Maks. 64 merkkiä pitkä.'),
        inspection: yup
          .number()
          .required(FIELD_REQUIRED)
          .min(2000)
          .max(new Date().getFullYear())
          .typeError(FIELD_NUMBER),
      })
    )
    .required()
    .min(1),
});
