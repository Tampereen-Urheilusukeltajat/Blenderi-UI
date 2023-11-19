import { FieldArray, FieldArrayRenderProps, Formik, Form } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DIVING_CYLINDER_SETS_QUERY_KEY } from '../../lib/queries/queryKeys';
import {
  DivingCylinderSetPostRequest,
  DivingCylinderSetTable,
  postDivingCylinderSet,
} from '../../lib/apiRequests/divingCylinderSetRequests';
import {
  DivingCylinder,
  DivingCylinderSet,
} from '../../interfaces/DivingCylinderSet';
import {
  ButtonType,
  IconButton,
  PrimaryButton,
} from '../common/Button/Buttons';
import { getUserIdFromAccessToken } from '../../lib/utils';
import { toast } from 'react-toastify';
import { NEW_CYLINDER_SET_VALIDATION_SCHEMA } from './validation';
import { TextInput, DropdownMenu } from '../common/Inputs';
import { AxiosError } from 'axios';
import styles from './NewDivingCylinderSet.module.scss';

type FormDivingCylinder = Omit<DivingCylinder, 'id'> & { uniqueId: string };

const EmptyDivingCylinder = (
  material = 'steel',
  pressure = 0,
  inspection = '',
  volume = 0
): FormDivingCylinder => ({
  material,
  pressure,
  inspection,
  serialNumber: '',
  uniqueId: crypto.randomUUID(),
  volume,
});

type NewDivingCylinderRowProps = {
  fieldProps: FieldArrayRenderProps;
  index: number;
  lastItem: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  firstCylinder?: Omit<DivingCylinder, 'id'>;
};

const NewDivingCylinderRow: React.FC<NewDivingCylinderRowProps> = ({
  fieldProps,
  index,
  errors,
  lastItem,
  firstCylinder,
}) => {
  const { replace, remove, push } = fieldProps;
  return (
    <div>
      <div className={styles.cylinder}>
        <div className={styles.deleteButtonWrapper}>
          <IconButton
            tooltip="Poista pullo"
            icon={<BsXLg />}
            onClick={() =>
              lastItem && index === 0
                ? replace(index, { ...EmptyDivingCylinder() })
                : remove(index)
            }
          />
        </div>

        <TextInput
          label="Tilavuus"
          name={`divingCylinders.${index}.volume`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.volume}
          unit="l"
        />
        <DropdownMenu
          label="Materiaali"
          name={`divingCylinders.${index}.material`}
          errorText={errors.divingCylinders?.at(index)?.material}
        >
          <option value="steel">Teräs</option>
          <option value="aluminium">Alumiini</option>
          <option value="carbonFiber">Hiilikuitu</option>
        </DropdownMenu>
        <TextInput
          label="Suurin sallittu paine"
          name={`divingCylinders.${index}.pressure`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.pressure}
          unit="bar"
        />
        <TextInput
          label="Sarjanumero"
          name={`divingCylinders.${index}.serialNumber`}
          type="string"
          errorText={errors.divingCylinders?.at(index)?.serialNumber}
        />
        <TextInput
          label="Katsastusvuosi"
          name={`divingCylinders.${index}.inspection`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.inspection}
        />
      </div>
      {lastItem ? (
        <IconButton
          onClick={() =>
            push({
              ...EmptyDivingCylinder(
                firstCylinder?.material,
                firstCylinder?.pressure,
                firstCylinder?.inspection,
                firstCylinder?.volume
              ),
            })
          }
          type={ButtonType.button}
          icon={<BsPlusLg />}
          tooltip="Lisää pullo"
        />
      ) : null}
    </div>
  );
};

export const NewDivingCylinderSet: React.FC = () => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);

  const queryClient = useQueryClient();
  const cylinderSetMutation = useMutation({
    mutationFn: async (payload: DivingCylinderSetPostRequest) =>
      postDivingCylinderSet(payload),
    onSuccess: (cylinderSet) => {
      const cylinderSets = queryClient.getQueryData<DivingCylinderSet[]>(
        DIVING_CYLINDER_SETS_QUERY_KEY(userId)
      );

      queryClient.setQueryData(DIVING_CYLINDER_SETS_QUERY_KEY(userId), [
        ...(cylinderSets ?? []),
        cylinderSet,
      ]);
      toast.success('Uusi pullosetti lisätty!');
    },
    onError: (res: AxiosError) => {
      toast.error(
        'Uuden pullosetin luominen epäonnistui. Tarkista tiedot ja yritä uudelleen.'
      );
    },
  });

  const resetForm = useCallback((values: DivingCylinderSetTable): void => {
    values.divingCylinderSetName = '';
    values.divingCylinders = [{ ...EmptyDivingCylinder() }];
  }, []);

  const handleFormSubmit = useCallback(
    async (values: DivingCylinderSetTable) => {
      // Set isError to false because it does not reset between submits
      cylinderSetMutation.isError = false;
      await cylinderSetMutation.mutateAsync({
        owner: getUserIdFromAccessToken(),
        name: values.divingCylinderSetName,
        cylinders: values.divingCylinders.map((dc) => ({
          inspection: dc.inspection,
          material: dc.material,
          pressure: dc.pressure,
          serialNumber: dc.serialNumber,
          volume: dc.volume,
        })),
      });
      if (!cylinderSetMutation.isError) {
        resetForm(values);
      }
    },
    [cylinderSetMutation, resetForm]
  );

  return (
    <div className="mt-5">
      <h1 className="pb-4">Uusi pullosetti</h1>
      <Formik
        initialValues={{
          divingCylinderSetName: '',
          divingCylinders: [{ ...EmptyDivingCylinder() }],
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={NEW_CYLINDER_SET_VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
        handleReset={resetForm}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <h2>Yleistiedot</h2>
            <TextInput
              name="divingCylinderSetName"
              placeholder="Esim. D12"
              label="Pullosetin nimi"
              errorText={errors.divingCylinderSetName}
            />
            <h2 className="pt-3">Pullot</h2>
            <FieldArray name="divingCylinders">
              {(arrayHelpers) =>
                values.divingCylinders.map((dc, index) => (
                  <NewDivingCylinderRow
                    key={dc.uniqueId}
                    errors={errors}
                    fieldProps={arrayHelpers}
                    index={index}
                    lastItem={values.divingCylinders.length === index + 1}
                    firstCylinder={values.divingCylinders[0]}
                  />
                ))
              }
            </FieldArray>

            <div className={styles.submit}>
              <PrimaryButton
                disabled={isSubmitting}
                text="Tallenna pullosetti"
                type={ButtonType.submit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
