import * as yup from 'yup';
import { FIELD_REQUIRED } from '../../lib/validationUtils';

export const AIR_FILLING_EVENT_VALIDATION_SCHEMA = yup.object().shape({
  additionalInformation: yup.string().optional(),
  userConfirm: yup.boolean().isTrue(),
  fillingEventRows: yup
    .array()
    .of(
      yup.object().shape({
        divingCylinderSet: yup.string().required(FIELD_REQUIRED),
      }),
    )
    .required()
    .min(1),
});
