import { FieldArray } from 'formik';
import { BsTrash } from 'react-icons/bs';
import { EmptyLogbookFillingEventRow } from '../Logbook';
import { type DivingCylinderSet } from '../../../interfaces/DivingCylinderSet';
import {
  ElementButton,
  PrimaryButton,
  ButtonType,
} from '../../common/Button/Buttons';
import { DropdownMenu } from '../../common/Inputs';
import React from 'react';
import styles from './FillingTile.module.scss';
import { type LogbookCommonTileProps } from './LogBookBasicInfoTile';

type LogbookFillingEventRowProps = LogbookCommonTileProps & {
  index: number;
  remove: (index: number) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  divingCylinderSets: DivingCylinderSet[];
};

type AirLogbookFillingTileProps = LogbookCommonTileProps & {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean,
  ) => void;
  divingCylinderSets: DivingCylinderSet[];
};

export const LogbookFillingEventRowComponent: React.FC<
  LogbookFillingEventRowProps
> = ({ index, errors, values, remove, divingCylinderSets }) => (
  <div className={styles.cylinderSet}>
    <DropdownMenu
      disabled={values.userConfirm}
      label="Pullosetti"
      name={`fillingEventRows.${index}.divingCylinderSet`}
      errorText={errors.fillingEventRows?.at(index)?.divingCylinderSet}
    >
      <optgroup label="Omat pullot">
        {divingCylinderSets.map((dcs: DivingCylinderSet) => (
          <option
            key={dcs.id}
            value={dcs.id}
            disabled={values.fillingEventRows.some(
              (row) => row.divingCylinderSet === dcs.id,
            )}
          >
            {dcs.name}
            {divingCylinderSets.filter((e) => e.name === dcs.name).length > 1
              ? ` (${dcs.cylinders[0].serialNumber}${
                  dcs.cylinders.length > 1 ? ' jne...' : ''
                })`
              : ''}
          </option>
        ))}
      </optgroup>
    </DropdownMenu>
    <div className={styles.deleteButtonWrapper}>
      <ElementButton
        disabled={values.userConfirm}
        className="deleteRowButton"
        element={<BsTrash />}
        onClick={() => {
          remove(index);
        }}
      />
    </div>
  </div>
);

export const LogbookFillingTile: React.FC<AirLogbookFillingTileProps> = ({
  errors,
  setFieldValue,
  values,
  divingCylinderSets,
}) => {
  return (
    <div className="pt-3 pb-3 border-bottom">
      <h2>Täytetyt pullosetit</h2>
      <FieldArray name="fillingEventRows">
        {({ remove, push }) => (
          <div>
            {values.fillingEventRows.map((row, index) => (
              <LogbookFillingEventRowComponent
                key={row.uniqueId}
                errors={errors}
                index={index}
                remove={remove}
                setFieldValue={setFieldValue}
                values={values}
                divingCylinderSets={divingCylinderSets}
              />
            ))}
            <div className={styles.addRow}>
              <PrimaryButton
                disabled={values.userConfirm}
                onClick={() => {
                  push({
                    ...EmptyLogbookFillingEventRow(),
                  });
                }}
                text="Lisää rivi"
                type={ButtonType.button}
              />
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};
