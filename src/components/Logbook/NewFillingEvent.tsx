import { Form, Formik } from 'formik';
import { useCallback } from 'react';
import { AirLogbookSavingTile } from '../BlenderLogbook/components/SavingTile';
import { LogbookFillingEventRow } from '../BlenderLogbook/NewBlenderFillingEvent';
import { LogbookFillingTile } from './FillingTile';
import { LogbookBasicInfoTile } from './LogBookBasicInfoTile';
import { AIR_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';

type FillingEventBasicInfo = {
  additionalInformation: string;
  gasMixture: string;
  userConfirm: boolean;
};

export const EMPTY_LOGBOOK_FILLING_EVENT_ROW: LogbookFillingEventRow = {
  divingCylinderSet: '',
};

const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  gasMixture: 'Paineilma',
  userConfirm: false,
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
              ...EMPTY_LOGBOOK_FILLING_EVENT_ROW,
            },
          ],
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={AIR_FILLING_EVENT_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form>
            <div className="fillingEventFlexRow">
              <LogbookBasicInfoTile errors={errors} values={values} />
              <AirLogbookSavingTile errors={errors} values={values} />
            </div>
            <div className="fillingEventFlexRow">
              <LogbookFillingTile
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
