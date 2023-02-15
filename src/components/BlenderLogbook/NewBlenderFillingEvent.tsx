import React, { useCallback, useMemo } from 'react';
import { Form, Formik } from 'formik';
import {
  AvailableGasses,
  getUserIdFromAccessToken,
  mapGasToName,
} from '../../lib/utils';
import { FillingTile } from './components/FillingTile';
import { SavingTile } from './components/SavingTile';
import { PricingTile } from './components/PricingTile';
import { BasicInfoTile } from './components/BasicInfoTile';
import { BLENDER_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';
import { useStorageCylinderQuery } from '../../lib/queries/storageCylinderQuery';
import { DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';

type FillingEventBasicInfo = {
  additionalInformation: string;
  divingCylinderSetId: string;
  gasMixture: string;
  userConfirm: boolean;
};

type LogbookFillingEventBasicInfo = {
  additionalInformation: string;
  gasMixture: string;
  userConfirm: boolean;
};

type FillingEventRow = {
  consumption: number;
  endPressure: number;
  priceEurCents: number;
  startPressure: number;
  storageCylinderId: string;
};

export type LogbookFillingEventRow = {
  cylinderSet: string;
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

type LogbookFormFields = LogbookFillingEventBasicInfo & {
  fillingEventRows: LogbookFillingEventRow[];
};

// TODO find a better way to initialize divingCylinderSetId
const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  divingCylinderSetId: '',
  gasMixture: '',
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

type NewFillingEventProps = Record<string, never>;

export type CommonTileProps = {
  // TODO FIX THIS
  // Casting as any because array errors wouldn't be otherwise correctly typed
  // It might be possible to fix this in the future with bit more time
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  values: FormFields;
};

export type LogbookCommonTileProps = {
  // TODO FIX THIS
  // Casting as any because array errors wouldn't be otherwise correctly typed
  // It might be possible to fix this in the future with bit more time
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  values: LogbookFormFields;
};

export type GasPrice = {
  gasId: string;
  gas: AvailableGasses;
  name: string;
  priceEurCents: number;
};

export const NewBlenderFillingEvent: React.FC<
  NewFillingEventProps
> = (): JSX.Element => {
  const handleFormSubmit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Moro');
  }, []);

  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const divingCylinderSets: DivingCylinderSet[] =
    useDivingCylinderQuery(userId).data ?? [];
  const { data: storageCylinders } = useStorageCylinderQuery();

  const prices = [
    {
      gasId: '1',
      gas: AvailableGasses.oxygen,
      name: mapGasToName(AvailableGasses.oxygen),
      priceEurCents: 1,
    },
    {
      gasId: '2',
      gas: AvailableGasses.helium,
      name: mapGasToName(AvailableGasses.helium),
      priceEurCents: 5,
    },
    {
      gasId: '3',
      gas: AvailableGasses.argon,
      name: mapGasToName(AvailableGasses.argon),
      priceEurCents: 2,
    },
  ];

  return (
    <div>
      <h1 className="pb-4">Luo uusi täyttötapahtuma</h1>
      {storageCylinders ? (
        <Formik
          initialValues={{
            ...EMPTY_FILLING_EVENT_BASIC_INFO,
            divingCylinderSetId: divingCylinderSets[0].id ?? '',
            fillingEventRows: [
              {
                ...EMPTY_FILLING_EVENT_ROW,
                storageCylinderId: storageCylinders[0].id,
              },
            ],
            guestDivingCylinder: EMPTY_GUEST_DIVING_CYLINDER,
          }}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={BLENDER_FILLING_EVENT_VALIDATION_SCHEMA}
          onSubmit={handleFormSubmit}
        >
          {({ errors, values, setFieldValue }) => (
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
                />
                <PricingTile errors={errors} prices={prices} values={values} />
              </div>
              <div className="fillingEventFlexRow">
                <FillingTile
                  setFieldValue={setFieldValue}
                  errors={errors}
                  values={values}
                  storageCylinders={storageCylinders}
                  prices={prices}
                />
              </div>
            </Form>
          )}
        </Formik>
      ) : null}
    </div>
  );
};
