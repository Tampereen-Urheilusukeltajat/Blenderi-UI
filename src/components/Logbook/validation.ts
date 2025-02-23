import * as yup from 'yup';
import { ATLEAST_ONE } from '../../lib/validationUtils';

export const AIR_FILLING_EVENT_VALIDATION_SCHEMA = yup.object().shape({
  additionalInformation: yup.string().optional(),
  userConfirm: yup.boolean().isTrue(),
  divingCylinderSetIds: yup
    .array()
    .of(yup.string().uuid())
    .required(ATLEAST_ONE)
    .min(1, ATLEAST_ONE),
});
