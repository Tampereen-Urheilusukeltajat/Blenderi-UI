import { FieldArray } from 'formik';
import { BsTrash } from 'react-icons/bs';
import { LogbookCommonTileProps } from '../BlenderLogbook/NewBlenderFillingEvent';
import { EMPTY_LOGBOOK_FILLING_EVENT_ROW } from './NewFillingEvent';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';
import { DivingCylinderSet } from '../../interfaces/DivingCylinderSet';
import {
  IconButton,
  PrimaryButton,
  ButtonType,
} from '../common/Button/Buttons';
import { DropdownMenu } from '../common/Inputs';
import React, { useMemo } from 'react';
import { getUserIdFromAccessToken } from '../../lib/utils';

type LogbookFillingEventRowProps = LogbookCommonTileProps & {
  index: number;
  remove: (index: number) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
};

type AirLogbookFillingTileProps = LogbookCommonTileProps & {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
};

export const LogbookFillingEventRowComponent: React.FC<
  LogbookFillingEventRowProps
> = ({ index, errors, values, remove }) => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);

  const divingCylinderSets: DivingCylinderSet[] =
    useDivingCylinderQuery(userId).data ?? [];

  return (
    <div>
      <div className="fillingEventGridRow">
        <DropdownMenu
          name={`fillingEventRows.${index}.divingCylinderSet`}
          errorText={errors.fillingEventRows?.at(index)?.divingCylinderSet}
        >
          <optgroup label="Omat pullot">
            {divingCylinderSets.map((dcs: DivingCylinderSet) => (
              <option
                key={dcs.id}
                value={dcs.id}
                disabled={values.fillingEventRows.some(
                  (row) => row.divingCylinderSet === dcs.id
                )}
              >
                {dcs.name}
                {divingCylinderSets.filter((e) => e.name === dcs.name).length >
                1
                  ? ` (${dcs.cylinders[0].serialNumber}${
                      dcs.cylinders.length > 1 ? ' jne...' : ''
                    })`
                  : ''}
              </option>
            ))}
          </optgroup>
        </DropdownMenu>
        <IconButton
          className="deleteRowButton"
          icon={<BsTrash />}
          onClick={() => remove(index)}
        />
      </div>
    </div>
  );
};

export const LogbookFillingTile: React.FC<AirLogbookFillingTileProps> = ({
  errors,
  setFieldValue,
  values,
}) => {
  return (
    <div className="tileWrapper">
      <h2>Täytetyt pullosetit</h2>
      <div className="fillingEventGridRow titleBar">
        <span>Pullosetti</span>
        <span>Poista</span>
      </div>
      <FieldArray name="fillingEventRows">
        {({ remove, push }) => (
          <>
            {values.fillingEventRows.map((row, index) => (
              <LogbookFillingEventRowComponent
                key={index}
                errors={errors}
                index={index}
                remove={remove}
                setFieldValue={setFieldValue}
                values={values}
              />
            ))}
            <PrimaryButton
              className="addNewRow"
              onClick={() =>
                push({
                  ...EMPTY_LOGBOOK_FILLING_EVENT_ROW,
                })
              }
              type={ButtonType.button}
              text="Lisää uusi rivi"
            />
          </>
        )}
      </FieldArray>
    </div>
  );
};
