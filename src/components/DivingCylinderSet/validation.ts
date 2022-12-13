import * as yup from 'yup';
import { FIELD_REQUIRED } from '../UserSettings/validation';

const FIELD_NUMBER = 'Annetun arvon on oltava numero';
const MAX_VOLUME = 100;
const MAX_PRESSURE = 500;
const MIN_INSPECT_YEAR = 2000;

export const NEW_CYLINDER_SET_VALIDATION_SCHEMA = yup.object().shape({
  divingCylinderSetName: yup.string().required(FIELD_REQUIRED).min(1).max(255),
  divingCylinders: yup
    .array()
    .of(
      yup.object().shape({
        volume: yup
          .number()
          .required(FIELD_REQUIRED)
          .positive('Tilavuuden täytyy olla positiivinen')
          .max(100, `Tilavuus voi olla enintään ${MAX_VOLUME} litraa`)
          .typeError(FIELD_NUMBER),
        material: yup
          .string()
          .required(FIELD_REQUIRED)
          .max(32, 'Maks. 32 merkkiä.'),
        pressure: yup
          .number()
          .required(FIELD_REQUIRED)
          .positive('Paineen täytyy olla positiivinen')
          .max(500, `Paine voi olla enintään ${MAX_PRESSURE} baria`)
          .typeError(FIELD_NUMBER),
        serialNumber: yup
          .string()
          .required(FIELD_REQUIRED)
          .max(64, 'Maks. 64 merkkiä pitkä.'),
        inspection: yup
          .number()
          .required(FIELD_REQUIRED)
          .min(
            MIN_INSPECT_YEAR,
            `Katsastusvuoden täytyy olla vähintään ${MIN_INSPECT_YEAR}`
          )
          .max(
            new Date().getFullYear(),
            'Katsastusvuosi ei voi olla tulevaisuudessa'
          )
          .typeError(FIELD_NUMBER),
      })
    )
    .required()
    .min(1),
});
