import React, { useCallback } from 'react';
import styles from './BlenderLogbook.module.scss';
import { type Compressor } from '../../lib/queries/compressorQuery';
import { type GasWithPricing } from '../../lib/queries/gasQuery';
import { type DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { type StorageCylinder } from '../../lib/queries/storageCylinderQuery';
import { Form, Formik, type FormikHelpers } from 'formik';
import { BasicInfoTile } from './components/BasicInfoTile';
import { PricingTile } from './components/PricingTile';
import { FillingTile } from './components/FillingTile';
import { SavingTile } from './components/SavingTile';
import {
  AvailableMixtureCompositions,
  type AvailableMixtures,
  formalizeGasMixture,
  formatEurToEurCents,
} from '../../lib/utils';
import { BLENDER_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';
import { useMutation } from '@tanstack/react-query';
import {
  type NewFillEvent,
  type StorageCylinderUsage,
} from '../../interfaces/FillEvent';
import { postFillEvent } from '../../lib/apiRequests/fillEventRequests';
import { toast } from 'react-toastify';

type NewFillingEventProps = {
  compressors: Compressor[];
  divingCylinderSets: DivingCylinderSet[];
  gases: GasWithPricing[];
  storageCylinders: StorageCylinder[];
};

type FillingEventBasicInfo = {
  additionalInformation: string;
  divingCylinderSetId: string;
  gasMixture: AvailableMixtures;
  heliumPercentage: string;
  oxygenPercentage: string;
  userConfirm: boolean;
  compressorId: string;
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
  compressorId: '',
};

export const emptyFillingRow = (startPressure = 0): FillingEventRow => ({
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

export const NewBlenderFillingEvent: React.FC<NewFillingEventProps> = ({
  compressors,
  divingCylinderSets,
  gases,
  storageCylinders,
}) => {
  const fillEventMutation = useMutation({
    mutationFn: async (payload: NewFillEvent) => postFillEvent(payload),
    onError: () => {
      toast.error(
        'Uuden täyttötapahtuman luominen epäonnistui. Tarkista tiedot ja yritä uudelleen.',
      );
    },
  });

  const handleFormSubmit = useCallback(
    (values: FormFields, helpers: FormikHelpers<FormFields>) => {
      const formalizedGasMixture = formalizeGasMixture(
        values.gasMixture,
        values.oxygenPercentage,
        values.heliumPercentage,
      );

      const totalPriceEurCents = formatEurToEurCents(
        values.fillingEventRows
          .map((row) => row.priceEurCents)
          .reduce((partialSum, price) => partialSum + price, 0),
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
          compressorId: values.compressorId ? values.compressorId : undefined,
        },
        {
          onSuccess: () => {
            toast.success('Uusi täyttötapahtuma lisätty!');
            helpers.resetForm();
          },
          onSettled: () => {
            helpers.setSubmitting(false);
          },
        },
      );
    },
    [fillEventMutation],
  );

  return (
    <div>
      <h1 className="pb-4">Luo uusi täyttötapahtuma</h1>

      <Formik
        initialValues={{
          ...EMPTY_FILLING_EVENT_BASIC_INFO,
          divingCylinderSetId: divingCylinderSets[0]?.id ?? '',
          compressorId: compressors[0].id ?? '',
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
                compressors={compressors}
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
    </div>
  );
};
