import * as yup from 'yup';
import { FIELD_REQUIRED } from '../UserSettings/validation';

const FIELD_NUMBER = 'Annetun arvon on oltava numero';

export const BLENDER_FILLING_EVENT_VALIDATION_SCHEMA = yup.object().shape({
  additionalInformation: yup.string().optional(),
  divingCylinderSetId: yup.string().required(FIELD_REQUIRED),
  gasMixture: yup.string().required(FIELD_REQUIRED),
  userConfirm: yup.boolean().isTrue(),
  guestDivingCylinder: yup.object().shape({
    inspectionYear: yup
      .number()
      .typeError(FIELD_NUMBER)
      .typeError(FIELD_NUMBER)
      .min(2000)
      .max(new Date().getFullYear())
      .required(FIELD_REQUIRED),
    maxPressure: yup
      .number()
      .typeError(FIELD_NUMBER)
      .min(0)
      .required(FIELD_REQUIRED),
    volume: yup
      .number()
      .typeError(FIELD_NUMBER)
      .min(0)
      .required(FIELD_REQUIRED),
  }),
  fillingEventRows: yup
    .array()
    .of(
      yup.object().shape({
        consumption: yup.number(),
        priceEurCents: yup.number(),
        startPressure: yup
          .number()
          .typeError(FIELD_NUMBER)
          .min(0)
          .required(FIELD_REQUIRED),
        endPressure: yup
          .number()
          .typeError(FIELD_NUMBER)
          .min(0)
          .required(FIELD_REQUIRED)
          .when(['startPressure'], (startPressure, schema) =>
            schema.max(startPressure, 'Loppupaine liian korkea')
          ),
        storageCylinderId: yup.string().required(FIELD_REQUIRED),
      })
    )
    .required()
    .min(1),
});
