import * as yup from 'yup';

export const AIR_FILLING_EVENT_VALIDATION_SCHEMA = yup.object().shape({
  additionalInformation: yup.string().optional(),
  userConfirm: yup.boolean().isTrue(),
  fillingEventRows: yup
    .array()
    .of(
      yup.object().shape({
        cylinderSet: yup.string().required(),
      })
    )
    .required()
    .min(1),
});
