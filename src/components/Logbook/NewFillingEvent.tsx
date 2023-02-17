import { Form, Formik, FormikValues } from 'formik';
import { AirLogbookSavingTile } from '../BlenderLogbook/components/SavingTile';
import { LogbookFillingEventRow } from '../BlenderLogbook/NewBlenderFillingEvent';
import { LogbookFillingTile } from './FillingTile';
import { LogbookBasicInfoTile } from './LogBookBasicInfoTile';
import { AIR_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { NewFillEvent } from '../../interfaces/FillEvent';
import { postFillEvent } from '../../lib/apiRequests/fillEventRequests';

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
  const fillEventMutation = useMutation({
    mutationFn: async (payload: NewFillEvent) => postFillEvent(payload),
    onSuccess: (cylinderSet) => {
      toast.success('Uusi täyttötapahtuma lisätty!');
    },
    onError: () => {
      toast.error(
        'Uuden täyttötapahtuman luominen epäonnistui. Tarkista tiedot ja yritä uudelleen.'
      );
    },
  });

  const handleSubmit = async (values: FormikValues): Promise<void> => {
    for (const { divingCylinderSet } of values.fillingEventRows) {
      await fillEventMutation.mutate(
        {
          cylinderSetId: divingCylinderSet,
          gasMixture: 'EAN21',
          filledAir: true,
          description: values.additionalInformation,
          price: 0,
          storageCylinderUsageArr: [],
        },
        {}
      );
    }
  };

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
                errors={errors}
                setFieldValue={setFieldValue}
                values={values}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
