import { Field, FieldArray, FieldArrayRenderProps, Form, Formik } from 'formik';
import React from 'react';
import { Button } from 'react-bootstrap';
import { BsTrash } from 'react-icons/bs';

import '../../styles/divingCylinderSet/newDivingCylinderSet.css';
import { IconButton } from '../common/IconButton';

const NewDivingCylinderRow = (
  { remove, push }: FieldArrayRenderProps,
  index: number,
  lastItem: boolean
): JSX.Element => {
  return (
    <div key={index}>
      <div className="flexRow">
        <div className="labelAndInput">
          <span>Koko (l)</span>
          <Field name={`divingCylinders.${index}.volume`} />
        </div>
        <div className="labelAndInput">
          <span>Materiaali</span>
          <Field name={`divingCylinders.${index}.material`} />
        </div>
        <div className="labelAndInput">
          <span>Suurin täyttöpaine (bar)</span>
          <Field name={`divingCylinders.${index}.maximumFillingPressure`} />
        </div>
        <div className="labelAndInput">
          <span>Sarjanumero</span>
          <Field name={`divingCylinders.${index}.serialNumber`} />
        </div>
        <div className="labelAndInput">
          <span>Katsastusvuosi</span>
          <Field name={`divingCylinders.${index}.inspectionYear`} />
        </div>
        <IconButton
          className="btn-danger deleteRowButton"
          icon={<BsTrash />}
          onClick={() => remove(index)}
          disabled={lastItem && index === 0}
        />
      </div>
      {lastItem ? (
        <Button className="addNewDivingCylinder" onClick={() => push({})}>
          Lisää pullo
        </Button>
      ) : null}
    </div>
  );
};

export const NewDivingCylinderSet = (): JSX.Element => {
  return (
    <div>
      <h2>Uusi pullosetti</h2>
      <Formik
        initialValues={{
          divingCylinderSetName: '',
          divingCylinders: [{}],
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values }) => (
          <Form className="newCylinderSetForm">
            <div className="flexRow">
              <div className="labelAndInput">
                <label htmlFor="divingCylinderSetName">Pullosetin nimi</label>
                <Field
                  id="divingCylinderSetName"
                  name="divingCylinderSetName"
                />
              </div>
              <Button type="submit">Tallenna pullosetti</Button>
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
