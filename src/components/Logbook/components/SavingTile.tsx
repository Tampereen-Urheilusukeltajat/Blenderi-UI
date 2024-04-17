import { Field } from 'formik';
import { ButtonType, PrimaryButton } from '../../common/Button/Buttons';
import React from 'react';
import styles from './SavingTile.module.scss';
import { type LogbookCommonTileProps } from './LogBookBasicInfoTile';

export const AirLogbookSavingTile: React.FC<LogbookCommonTileProps> = ({
  values,
}): JSX.Element => (
  <div className="pt-3">
    <h2>Tallenna</h2>
    <div>
      <div className="d-flex gap-2">
        <Field id="id-userConfirm" type="checkbox" name="userConfirm" />
        <label htmlFor="id-userConfirm">
          Olen tarkistanut täyttämäni arvot
        </label>
      </div>
      <div className={styles.submit}>
        <PrimaryButton
          disabled={!values.userConfirm}
          type={ButtonType.submit}
          text="Tallenna täyttö"
        />
      </div>
    </div>
  </div>
);
