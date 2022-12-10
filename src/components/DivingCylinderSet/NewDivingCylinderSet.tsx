import { Field, FieldArray, FieldArrayRenderProps, Formik, Form } from 'formik';
import React, { useCallback } from 'react';
import { Col, InputGroup } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

import '../../styles/divingCylinderSet/newDivingCylinderSet.css';
import { ButtonType, IconButton, PrimaryButton } from '../common/Buttons';
import { postAsync } from '../../lib/apiRequests/api';
import { getUserIdFromAccessToken } from '../../lib/utils';
import { toast } from 'react-toastify';
import { NEW_CYLINDER_SET_VALIDATION_SCHEMA } from './validation';

type DivingCylinder = {
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
  lastItem: boolean
): JSX.Element => {
  return (
    <div key={index}>
      <div className="divingCylinderGridRow">
        <div className="labelAndInput">
          <InputGroup as={Col}>
            <Field
              className="form-control"
              name={`divingCylinders.${index}.volume`}
              type="number"
            />
            <InputGroup.Text>l</InputGroup.Text>
          </InputGroup>
        </div>
        <div className="labelAndInput">
          <InputGroup as={Col}>
            <Field
              as="select"
              list={`divingCylinders.${index}.material`}
              className="form-select"
              name={`divingCylinders.${index}.material`}
            >
              <option value="steel">Teräs</option>
              <option value="aluminium">Alumiini</option>
              <option value="carbonFiber">Hiilikuitu</option>
            </Field>
          </InputGroup>
        </div>
        <div className="labelAndInput">
          <InputGroup as={Col}>
            <Field
              type="number"
              list={`divingCylinders.${index}.pressure`}
              className="form-control"
              name={`divingCylinders.${index}.pressure`}
            />
            <InputGroup.Text>bar</InputGroup.Text>
          </InputGroup>
        </div>
        <div className="labelAndInput">
          <Field
            className="form-control"
            name={`divingCylinders.${index}.serialNumber`}
          />
        </div>
        <div className="labelAndInput">
          <Field
            className="form-control"
            name={`divingCylinders.${index}.inspection`}
            type="number"
          />
        </div>
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

type CylinderSetRequest = {
  owner: string;
  name: string;
  cylinders: DivingCylinder[];
};

type CylinderSetResponse = {
  id: string;
  owner: string;
  name: string;
  cylinders: Array<
    DivingCylinder & {
      id: string;
    }
  >;
};

export const NewDivingCylinderSet = (): JSX.Element => {
  const handleFormSubmit = useCallback(async (values: DivingCylinderSet) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const cylinderSetResponse = await postAsync<
        CylinderSetResponse,
        CylinderSetRequest
      >('/api/cylinder-set/', {
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
  }, []);

  const resetForm = (values: DivingCylinderSet): void => {
    values.divingCylinderSetName = '';
    values.divingCylinders = [EmptyDivingCylinder];
  };

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
              <div className="labelAndInput">
                <span className="pb-2">Pullosetin nimi</span>
                <Field
                  name="divingCylinderSetName"
                  className="form-control"
                  placeholder="Esim. D12"
                />
                {(touched.divingCylinderSetName ?? false) &&
                  errors.divingCylinderSetName && (
                    <div className="error">{errors.divingCylinderSetName}</div>
                  )}
              </div>
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
                      values.divingCylinders.length === index + 1
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
