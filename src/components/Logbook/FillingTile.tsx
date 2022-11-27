import { FieldArray } from 'formik';
import { BsTrash } from 'react-icons/bs';
import {
  EMPTY_LOGBOOK_FILLING_EVENT_ROW,
  LogbookCommonTileProps,
} from '../BlenderLogbook/NewBlenderFillingEvent';
import { IconButton, PrimaryButton, ButtonType } from '../common/Buttons';
import { DropdownMenu } from '../common/Inputs';

type LogbookFillingEventRowProps = LogbookCommonTileProps & {
  index: number;
  replace: (index: number, newValue: unknown) => void;
  remove: (index: number) => void;
  push: (value: unknown) => void;
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
> = ({ index, errors, values, replace, remove, push }) => {
  return (
    <div>
      <div className="fillingEventGridRow">
        <DropdownMenu
          name="fillingEventRows.storageCylinderId"
          errorText={errors.fillingEventRows?.at(index)?.storageCylinderId}
        ></DropdownMenu>
        <IconButton
          className="deleteRowButton"
          icon={<BsTrash />}
          onClick={() =>
            index === 0
              ? replace(index, {
                  ...EMPTY_LOGBOOK_FILLING_EVENT_ROW,
                })
              : remove(index)
          }
        />
      </div>
      {values.fillingEventRows.length === index + 1 ? (
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
      ) : null}
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
        {({ replace, remove, push }) => (
          <>
            {values.fillingEventRows.map((row, index) => (
              <LogbookFillingEventRowComponent
                key={index}
                errors={errors}
                index={index}
                push={push}
                remove={remove}
                replace={replace}
                setFieldValue={setFieldValue}
                values={values}
              />
            ))}
          </>
        )}
      </FieldArray>
    </div>
  );
};
