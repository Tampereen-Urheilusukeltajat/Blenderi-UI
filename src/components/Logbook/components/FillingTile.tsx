import { type DivingCylinderSet } from '../../../interfaces/DivingCylinderSet';

import React from 'react';
import styles from './FillingTile.module.scss';
import { type LogbookCommonTileProps } from './LogBookBasicInfoTile';
import FormCheckLabel from 'react-bootstrap/esm/FormCheckLabel';
import { FormCheck } from 'react-bootstrap';
import { Field } from 'formik';

type AirLogbookFillingTileProps = LogbookCommonTileProps & {
  divingCylinderSets: DivingCylinderSet[];
};

export const LogbookFillingTile: React.FC<AirLogbookFillingTileProps> = ({
  divingCylinderSets,
  errors,
  values,
}) => {
  return (
    <div className="pt-3 pb-3 border-bottom">
      <h2>Täytetyt pullosetit</h2>
      <span className="text-danger">{errors.divingCylinderSetIds}</span>

      <div className="d-flex flex-row gap-4">
        <div className={`d-flex flex-column ${styles.fillingTile}`}>
          <h3>Omat pullot</h3>
          {divingCylinderSets.map((dcs) => (
            <FormCheck key={dcs.id}>
              <Field
                className="form-check-input"
                disabled={values.userConfirm}
                id={dcs.id}
                name={'divingCylinderSetIds'}
                type="checkbox"
                value={dcs.id}
              />
              <FormCheckLabel htmlFor={dcs.id}>{dcs.name}</FormCheckLabel>
            </FormCheck>
          ))}
        </div>
      </div>
    </div>
  );
};
