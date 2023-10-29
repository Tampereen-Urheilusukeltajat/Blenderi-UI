import { FieldArray, FieldArrayRenderProps, Formik, Form } from 'formik';
import React, { useCallback, useMemo } from 'react';
import { BsTrash } from 'react-icons/bs';
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
import '../../styles/divingCylinderSet/newDivingCylinderSet.css';
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

const EmptyDivingCylinder: Omit<DivingCylinder, 'id'> = {
  volume: 0,
  material: 'steel',
  pressure: 0,
  serialNumber: '',
  inspection: '',
};

const NewDivingCylinderRow = (
  { remove, push, replace }: FieldArrayRenderProps,
  index: number,
  lastItem: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any
): JSX.Element => {
  return (
    <div key={index}>
      <div className="divingCylinderGridRow">
        <TextInput
          name={`divingCylinders.${index}.volume`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.volume}
          unit="l"
        />
        <DropdownMenu
          name={`divingCylinders.${index}.material`}
          errorText={errors.divingCylinders?.at(index)?.material}
        >
          <option value="steel">Teräs</option>
          <option value="aluminium">Alumiini</option>
          <option value="carbonFiber">Hiilikuitu</option>
        </DropdownMenu>
        <TextInput
          name={`divingCylinders.${index}.pressure`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.pressure}
          unit="bar"
        />
        <TextInput
          name={`divingCylinders.${index}.serialNumber`}
          type="string"
          errorText={errors.divingCylinders?.at(index)?.serialNumber}
        />
        <TextInput
          name={`divingCylinders.${index}.inspection`}
          type="number"
          errorText={errors.divingCylinders?.at(index)?.inspection}
        />
        <IconButton
          icon={<BsTrash />}
          onClick={() =>
            lastItem && index === 0
              ? replace(index, EmptyDivingCylinder)
              : remove(index)
          }
        />
      </div>
      {lastItem ? (
        <PrimaryButton
          className="addNewDivingCylinder"
          onClick={() => push(EmptyDivingCylinder)}
          type={ButtonType.button}
          text="Lisää pullo"
        />
      ) : null}
    </div>
  );
};

export const NewDivingCylinderSet = (): JSX.Element => {
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
    values.divingCylinders = [EmptyDivingCylinder];
  }, []);

  const handleFormSubmit = useCallback(
    async (values: DivingCylinderSetTable) => {
      // Set isError to false because it does not reset between submits
      cylinderSetMutation.isError = false;
      await cylinderSetMutation.mutateAsync({
        owner: getUserIdFromAccessToken(),
        name: values.divingCylinderSetName,
        cylinders: values.divingCylinders,
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
          divingCylinders: [EmptyDivingCylinder],
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={NEW_CYLINDER_SET_VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
        handleReset={resetForm}
      >
        {({ values, errors, isSubmitting }) => (
          <Form className="newCylinderSetForm">
            <div className="divingCylinderFlexRow">
              <TextInput
                name="divingCylinderSetName"
                placeholder="Esim. D12"
                label="Pullosetin nimi"
                errorText={errors.divingCylinderSetName}
              />
              <PrimaryButton
                text="Tallenna pullosetti"
                type={ButtonType.submit}
                disabled={isSubmitting}
              />
            </div>
            <div className="divingCylinderGridRow titleBar">
              <span>Koko</span>
              <span>Materiaali</span>
              <span>Suurin täyttöpaine</span>
              <span>Sarjanumero</span>
              <span>Katsastusvuosi</span>
              <span>Poista</span>
            </div>
            <FieldArray name="divingCylinders">
              {(arrayHelpers) => (
                <>
                  {values.divingCylinders.map((dc, index) =>
                    NewDivingCylinderRow(
                      arrayHelpers,
                      index,
                      values.divingCylinders.length === index + 1,
                      errors
                    )
                  )}
                </>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </div>
  );
};
