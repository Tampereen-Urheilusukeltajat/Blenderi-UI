import { Form, Formik, FormikValues } from 'formik';
import { AirLogbookSavingTile } from './components/SavingTile';
import { LogbookFillingEventRow } from '../BlenderLogbook/BlenderLogbook';
import { LogbookFillingTile } from './components/FillingTile';
import { LogbookBasicInfoTile } from './LogBookBasicInfoTile';
import { AIR_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { NewFillEvent } from '../../interfaces/FillEvent';
import { postFillEvent } from '../../lib/apiRequests/fillEventRequests';
import styles from './Logbook.module.scss';

type FillingEventBasicInfo = {
  additionalInformation: string;
  gasMixture: string;
  userConfirm: boolean;
};

export const EmptyLogbookFillingEventRow = (): LogbookFillingEventRow => ({
  divingCylinderSet: '',
  uniqueId: crypto.randomUUID(),
});
const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  gasMixture: 'Paineilma',
  userConfirm: false,
};

export const NewFillingEvent = (): JSX.Element => {
  const fillEventMutation = useMutation({
    mutationFn: async (payload: NewFillEvent) => postFillEvent(payload),
    onSuccess: () => {
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
      fillEventMutation.mutate(
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
              ...EmptyLogbookFillingEventRow(),
            },
          ],
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={AIR_FILLING_EVENT_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className={styles.form}>
            <LogbookBasicInfoTile errors={errors} values={values} />
            <LogbookFillingTile
              errors={errors}
              setFieldValue={setFieldValue}
              values={values}
            />
            <AirLogbookSavingTile errors={errors} values={values} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
