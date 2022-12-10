import { Field, FieldArray, FieldArrayRenderProps, Formik, Form } from 'formik';
import React, { useCallback } from 'react';
import { Col, InputGroup } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

import '../../styles/divingCylinderSet/newDivingCylinderSet.css';
import { ButtonType, IconButton, PrimaryButton } from '../common/Buttons';
import { postAsync } from '../../lib/apiRequests/api';
import { getUserIdFromAccessToken } from '../../lib/utils';

type DivingCylinder = {
  volume: string;
  material: string;
  maximumFillingPressure: string;
  serialNumber: string;
  inspectionYear: string;
};

type DivingCylinderSet = {
  divingCylinderSetName: string;
  divingCylinders: DivingCylinder[];
};

const EmptyDivingCylinder: DivingCylinder = {
  volume: '',
  material: 'steel',
  maximumFillingPressure: '',
  serialNumber: '',
  inspectionYear: '',
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
              list={`divingCylinders.${index}.maximumFillingPressures`}
              className="form-control"
              name={`divingCylinders.${index}.maximumFillingPressure`}
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
            name={`divingCylinders.${index}.inspectionYear`}
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
  cylinders: Array<{
    volume: string;
    material: string;
    pressure: string;
    serialNumber: string;
    inspection: string;
  }>;
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

export const NewDivingCylinderSet = async (): Promise<JSX.Element> => {
  const handleFormSubmit = useCallback(async (values: DivingCylinderSet) => {
    // TODO send request to backend
    // eslint-disable-next-line no-console
    console.log(values);
    const cylinderSetResponse = await postAsync<
      CylinderSetResponse,
      CylinderSetRequest
    >('/api/cylinder-set/', {
      owner: getUserIdFromAccessToken(),
      name: values.divingCylinderSetName,
      cylinders: values.divingCylinders,
    });
    // eslint-disable-next-line no-console
    console.log(cylinderSetResponse);
  }, []);

  /*
  const validateForm = (values: FormData) => {
    const errors: FormikErrors = {};

  } */

  return (
    <div className="mt-5">
      <h2>Uusi pullosetti</h2>
      <Formik
        initialValues={{
          divingCylinderSetName: '',
          divingCylinders: [EmptyDivingCylinder],
        }}
        // validationSchema={CylinderSetSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values }) => (
          <Form className="newCylinderSetForm">
            <div className="divingCylinderFlexRow">
              <div className="labelAndInput">
                <span className="pb-2">Pullosetin nimi</span>
                <Field
                  name="divingCylinderSetName"
                  className="form-control"
                  placeholder="Esim. D12"
                />
              </div>
              <PrimaryButton
                text="Tallenna pullosetti"
                type={ButtonType.submit}
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
