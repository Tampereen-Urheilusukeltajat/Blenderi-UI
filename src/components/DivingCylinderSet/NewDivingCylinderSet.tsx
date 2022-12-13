import { FieldArray, FieldArrayRenderProps, Formik, Form } from 'formik';
import React, { useCallback } from 'react';
import { BsTrash } from 'react-icons/bs';
import { postCylinderSet } from '../../lib/apiRequests/divingCylinderSetRequests';
import '../../styles/divingCylinderSet/newDivingCylinderSet.css';
import { ButtonType, IconButton, PrimaryButton } from '../common/Buttons';
import { getUserIdFromAccessToken } from '../../lib/utils';
import { toast } from 'react-toastify';
import { NEW_CYLINDER_SET_VALIDATION_SCHEMA } from './validation';
import { TextInput, DropdownMenu } from '../common/Inputs';

export type DivingCylinder = {
  volume: string;
  material: string;
  pressure: string;
  serialNumber: string;
  inspection: string;
};

type DivingCylinderSet = {
  divingCylinderSetName: string;
  divingCylinders: DivingCylinder[];
};

const EmptyDivingCylinder: DivingCylinder = {
  volume: '',
  material: 'steel',
  pressure: '',
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
  const resetForm = useCallback((values: DivingCylinderSet): void => {
    values.divingCylinderSetName = '';
    values.divingCylinders = [EmptyDivingCylinder];
  }, []);

  const handleFormSubmit = useCallback(
    async (values: DivingCylinderSet) => {
      try {
        // TODO: useMutation
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cylinderSetResponse = await postCylinderSet({
          owner: getUserIdFromAccessToken(),
          name: values.divingCylinderSetName,
          cylinders: values.divingCylinders,
        });
        resetForm(values);
        toast.success('Uusi pullosetti lisätty!');
      } catch (error) {
        toast.error(
          'Uuden pullosetin luominen epäonnistui. Tarkista tiedot ja yritä uudelleen.'
        );
      }
    },
    [resetForm]
  );

  return (
    <div className="mt-5">
      <h2>Uusi pullosetti</h2>
      <Formik
        initialValues={{
          divingCylinderSetName: '',
          divingCylinders: [EmptyDivingCylinder],
        }}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={NEW_CYLINDER_SET_VALIDATION_SCHEMA}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, isSubmitting }) => (
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
