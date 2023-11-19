import { useMutation } from '@tanstack/react-query';
import { Form, Formik, FormikHelpers } from 'formik';
import React, { useCallback } from 'react';
import { postFillEvent } from '../../../lib/apiRequests/fillEventRequests';
import { toast } from 'react-toastify';
import {
  AvailableMixtureCompositions,
  AvailableMixtures,
  formalizeGasMixture,
  formatEurToEurCents,
} from '../../../lib/utils';
import {
  NewFillEvent,
  StorageCylinderUsage,
} from '../../../interfaces/FillEvent';
import { DivingCylinderSet } from '../../../interfaces/DivingCylinderSet';
import { BLENDER_FILLING_EVENT_VALIDATION_SCHEMA } from '../validation';
import { BasicInfoTile } from './BasicInfoTile';
import { SavingTile } from './SavingTile';
import { PricingTile } from './PricingTile';
import { FillingTile } from './FillingTile';
import { GasWithPricing } from '../../../lib/queries/gasQuery';
import { StorageCylinder } from '../../../lib/queries/storageCylinderQuery';
import styles from './BlenderFillingEventForm.module.scss';

type FillingEventBasicInfo = {
  additionalInformation: string;
  divingCylinderSetId: string;
  gasMixture: AvailableMixtures;
  heliumPercentage: string;
  oxygenPercentage: string;
  userConfirm: boolean;
};

type FillingEventRow = {
  consumption: number;
  endPressure: number;
  priceEurCents: number;
  startPressure: number;
  storageCylinderId: string;
  uniqueId: string;
};

type FormFields = FillingEventBasicInfo & {
  fillingEventRows: FillingEventRow[];
};

// TODO find a better way to initialize divingCylinderSetId
const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  divingCylinderSetId: '',
  heliumPercentage: '0',
  gasMixture: AvailableMixtureCompositions[0].id,
  oxygenPercentage: '0',
  userConfirm: false,
};

export const emptyFillingRow = (startPressure = 200): FillingEventRow => ({
  consumption: 0,
  endPressure: startPressure,
  priceEurCents: 0,
  startPressure,
  storageCylinderId: '',
  uniqueId: crypto.randomUUID(),
});

export type CommonTileProps = {
  // TODO FIX THIS
  // Casting as any because array errors wouldn't be otherwise correctly typed
  // It might be possible to fix this in the future with bit more time
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  values: FormFields;
};

type BlenderFillingEventFormProps = {
  divingCylinderSets: DivingCylinderSet[];
  gases: GasWithPricing[];
  storageCylinders: StorageCylinder[];
};

export const BlenderFillingEventForm: React.FC<
  BlenderFillingEventFormProps
> = ({ divingCylinderSets, gases, storageCylinders }) => {
  const fillEventMutation = useMutation({
    mutationFn: async (payload: NewFillEvent) => postFillEvent(payload),
    onError: () => {
      toast.error(
        'Uuden täyttötapahtuman luominen epäonnistui. Tarkista tiedot ja yritä uudelleen.'
      );
    },
  });

  const handleFormSubmit = useCallback(
    (values: FormFields, helpers: FormikHelpers<FormFields>) => {
      const formalizedGasMixture = formalizeGasMixture(
        values.gasMixture,
        values.oxygenPercentage,
        values.heliumPercentage
      );

      const totalPriceEurCents = formatEurToEurCents(
        values.fillingEventRows
          .map((row) => row.priceEurCents)
          .reduce((partialSum, price) => partialSum + price, 0)
      );

      fillEventMutation.mutate(
        {
          cylinderSetId: values.divingCylinderSetId,
          description: values.additionalInformation,
          filledAir: false,
          gasMixture: formalizedGasMixture,
          price: totalPriceEurCents,
          storageCylinderUsageArr:
            values.fillingEventRows.map<StorageCylinderUsage>((row) => ({
              storageCylinderId: Number(row.storageCylinderId),
              endPressure: row.endPressure,
              startPressure: row.startPressure,
            })),
        },
        {
          onSuccess: () => {
            toast.success('Uusi täyttötapahtuma lisätty!');
            helpers.resetForm();
          },
          onSettled: () => {
            helpers.setSubmitting(false);
          },
        }
      );
    },
    [fillEventMutation]
  );

  return (
    <Formik
      initialValues={{
        ...EMPTY_FILLING_EVENT_BASIC_INFO,
        divingCylinderSetId: divingCylinderSets[0]?.id ?? '',
        fillingEventRows: [
          {
            ...emptyFillingRow(),
            storageCylinderId: storageCylinders[0]?.id ?? '',
          },
        ],
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={BLENDER_FILLING_EVENT_VALIDATION_SCHEMA}
      onSubmit={handleFormSubmit}
    >
      {({ errors, values, setFieldValue, isSubmitting }) => (
        <Form className={styles.form}>
          <div className="d-flex justify-content-between gap-3 pb-3 border-bottom">
            <BasicInfoTile
              divingCylinderSets={divingCylinderSets}
              errors={errors}
              values={values}
            />
            <PricingTile errors={errors} gases={gases} values={values} />
          </div>

          <FillingTile
            setFieldValue={setFieldValue}
            errors={errors}
            values={values}
            storageCylinders={storageCylinders}
            gases={gases}
          />

          <SavingTile
            totalPrice={values.fillingEventRows
              .map((row) => row.priceEurCents)
              .reduce((partialSum, price) => partialSum + price, 0)}
            errors={errors}
            values={values}
            isSubmitting={isSubmitting}
          />
        </Form>
      )}
    </Formik>
  );
};
