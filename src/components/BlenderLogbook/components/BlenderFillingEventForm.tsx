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
};

type GuestDivingCylinder = {
  inspectionYear: number;
  maxPressure: number;
  volume: number;
};

type FormFields = FillingEventBasicInfo & {
  fillingEventRows: FillingEventRow[];
  guestDivingCylinder: GuestDivingCylinder;
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

// TODO find a better way to initialize storageCylinderId
export const EMPTY_FILLING_EVENT_ROW: FillingEventRow = {
  consumption: 0,
  endPressure: 0,
  priceEurCents: 0,
  startPressure: 0,
  storageCylinderId: '',
};

const EMPTY_GUEST_DIVING_CYLINDER: GuestDivingCylinder = {
  inspectionYear: new Date().getFullYear(),
  maxPressure: 232,
  volume: 12,
};

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
            ...EMPTY_FILLING_EVENT_ROW,
            storageCylinderId: storageCylinders[0]?.id ?? '',
          },
        ],
        guestDivingCylinder: EMPTY_GUEST_DIVING_CYLINDER,
      }}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={BLENDER_FILLING_EVENT_VALIDATION_SCHEMA}
      onSubmit={handleFormSubmit}
    >
      {({ errors, values, setFieldValue, isSubmitting }) => (
        <Form>
          <div className="fillingEventFlexRow">
            <BasicInfoTile
              divingCylinderSets={divingCylinderSets}
              errors={errors}
              values={values}
            />
            <SavingTile
              totalPrice={values.fillingEventRows
                .map((row) => row.priceEurCents)
                .reduce((partialSum, price) => partialSum + price, 0)}
              errors={errors}
              values={values}
              isSubmitting={isSubmitting}
            />
            <PricingTile errors={errors} gases={gases} values={values} />
          </div>
          <div className="fillingEventFlexRow">
            <FillingTile
              setFieldValue={setFieldValue}
              errors={errors}
              values={values}
              storageCylinders={storageCylinders}
              gases={gases}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};
