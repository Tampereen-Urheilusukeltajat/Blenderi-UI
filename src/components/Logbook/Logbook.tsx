import { Form, Formik, type FormikHelpers } from 'formik';
import { AirLogbookSavingTile } from './components/SavingTile';
import { LogbookFillingTile } from './components/FillingTile';
import { LogbookBasicInfoTile } from './components/LogBookBasicInfoTile';
import { AIR_FILLING_EVENT_VALIDATION_SCHEMA } from './validation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { type NewFillEvent } from '../../interfaces/FillEvent';
import { postFillEvent } from '../../lib/apiRequests/fillEventRequests';
import styles from './Logbook.module.scss';
import { type Compressor } from '../../lib/queries/compressorQuery';
import { type DivingCylinderSet } from '../../interfaces/DivingCylinderSet';

type FillingEventBasicInfo = {
  additionalInformation: string;
  gasMixture: string;
  userConfirm: boolean;
  compressorId: string;
};

const EMPTY_FILLING_EVENT_BASIC_INFO: FillingEventBasicInfo = {
  additionalInformation: '',
  gasMixture: 'Paineilma (EAN21)',
  userConfirm: false,
  compressorId: '',
};

type NewFillingEventProps = {
  compressors: Compressor[];
  divingCylinderSets: DivingCylinderSet[];
};

type FormFields = FillingEventBasicInfo & { divingCylinderSetIds: string[] };

export const NewFillingEvent: React.FC<NewFillingEventProps> = ({
  compressors,
  divingCylinderSets,
}) => {
  const fillEventMutation = useMutation({
    mutationFn: async (payload: NewFillEvent) => postFillEvent(payload),
  });

  const handleSubmit = async (
    values: FormFields,
    helpers: FormikHelpers<FormFields>,
  ): Promise<void> => {
    for (const divingCylinderSetId of values.divingCylinderSetIds) {
      fillEventMutation.mutate(
        {
          cylinderSetId: divingCylinderSetId,
          gasMixture: 'EAN21',
          filledAir: true,
          description: values.additionalInformation,
          price: 0,
          storageCylinderUsageArr: [],
          compressorId: values.compressorId,
        },
        {
          onSuccess: () => {
            toast.success('Uusi täyttötapahtuma lisätty');
            helpers.resetForm();
          },
          onError: () => {
            toast.error(
              'Uuden täyttötapahtuman luominen epäonnistui. Tarkista tiedot ja yritä uudelleen',
            );
          },
        },
      );
    }
  };

  return (
    <div>
      <h1 className="pb-4">Luo uusi täyttötapahtuma</h1>
      <Formik
        initialValues={{
          ...EMPTY_FILLING_EVENT_BASIC_INFO,
          compressorId: compressors[0]?.id ?? '',
          divingCylinderSetIds: [] as string[],
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={AIR_FILLING_EVENT_VALIDATION_SCHEMA}
        onSubmit={handleSubmit}
      >
        {({ errors, values, setFieldValue }) => (
          <Form className={styles.form}>
            <LogbookBasicInfoTile
              errors={errors}
              values={values}
              compressors={compressors}
            />
            <LogbookFillingTile
              errors={errors}
              values={values}
              divingCylinderSets={divingCylinderSets}
            />
            <AirLogbookSavingTile errors={errors} values={values} />
          </Form>
        )}
      </Formik>
    </div>
  );
};
