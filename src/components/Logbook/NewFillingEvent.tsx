import { Formik } from 'formik';
import { useCallback } from 'react';
import { Form } from 'react-bootstrap';
import { LogBookFillingTile } from '../BlenderLogbook/components/FillingTile';
import { LogBookSavingTile } from '../BlenderLogbook/components/SavingTile';
import { LogBookBasicInfoTile } from './LogBookBasicInfoTile';

type FillingEventBasicInfo = {
  additionalInformation: string;
  divingCylinderSetId: string;
  gasMixture: string;
  userConfirm: boolean;
};

// TODO find a better way to initialize divingCylinderSetId
const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  divingCylinderSetId: '',
  gasMixture: '',
  userConfirm: false,
};

type FillingEventRow = {
  consumption: number;
  endPressure: number;
  priceEurCents: number;
  startPressure: number;
  storageCylinderId: string;
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

type GuestDivingCylinder = {
  inspectionYear: number;
  maxPressure: number;
  volume: number;
};

export const NewFillingEvent = (): JSX.Element => {
  const handleSubmit = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('TODO');
  }, []);

  return (
    <div>
      <h1 className="pb-4">Luo uusi täyttötapahtuma</h1>
      <Formik
        initialValues={{
          ...EMPTY_FILLING_EVENT_BASIC_INFO,
          fillingEventRows: [
            {
              ...EMPTY_FILLING_EVENT_ROW,
              storageCylinderId: '1',
            },
          ],
          guestDivingCylinder: EMPTY_GUEST_DIVING_CYLINDER,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <div className="fillingEventFlexRow">
              <LogBookBasicInfoTile errors={errors} values={values} />
              <LogBookSavingTile errors={errors} values={values} />
            </div>
            <div className="fillingEventFlexRow">
              <LogBookFillingTile
                setFieldValue={setFieldValue}
                errors={errors}
                values={values}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
