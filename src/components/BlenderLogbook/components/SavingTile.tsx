import { Field } from 'formik';
import { ButtonType, PrimaryButton } from '../../common/Button/Buttons';
import React from 'react';
import styles from './SavingTile.module.scss';
import { CommonTileProps } from '../BlenderLogbook';

type SavingTileProps = CommonTileProps & {
  totalPrice: number;
  isSubmitting: boolean;
};

export const SavingTile: React.FC<SavingTileProps> = ({
  values,
  totalPrice,
  isSubmitting,
}) => (
  <div className="pt-3">
    <h2>Tallenna</h2>
    <div>
      <div className="d-flex gap-2">
        <span>Kokonaishinta</span>
        <span>{totalPrice} €</span>
      </div>
    </div>
    <div>
      <div className="d-flex gap-1">
        <Field id="id-userConfirm" type="checkbox" name="userConfirm" />
        <label htmlFor="id-userConfirm">
          Olen tarkistanut täyttämäni arvot
        </label>
      </div>
      <div className={styles.submit}>
        <PrimaryButton
          disabled={!values.userConfirm || isSubmitting}
          type={ButtonType.submit}
          text="Tallenna täyttö"
        />
      </div>
    </div>
  </div>
);
