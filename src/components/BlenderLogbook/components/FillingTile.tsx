import { FieldArray } from 'formik';
import React, { useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { GasWithPricing } from '../../../lib/queries/gasQuery';
import { StorageCylinder } from '../../../lib/queries/storageCylinderQuery';
import {
  calculateGasConsumption,
  formatEurCentsToEur,
  mapGasToName,
} from '../../../lib/utils';
import { ButtonType, IconButton, PrimaryButton } from '../../common/Buttons';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import {
  CommonTileProps,
  EMPTY_FILLING_EVENT_ROW,
} from '../NewBlenderFillingEvent';

type FillingEventRowProps = CommonTileProps & {
  index: number;
  replace: (index: number, newValue: unknown) => void;
  remove: (index: number) => void;
  push: (value: unknown) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
  storageCylinders: StorageCylinder[];
  gases: GasWithPricing[];
};

const FillingEventRowComponent: React.FC<FillingEventRowProps> = ({
  index,
  errors,
  values,
  replace,
  remove,
  push,
  setFieldValue,
  storageCylinders,
  gases,
}) => {
  const startPressure = values.fillingEventRows.at(index)?.startPressure;
  const endPressure = values.fillingEventRows.at(index)?.endPressure;
  const storageCylinderId =
    values.fillingEventRows.at(index)?.storageCylinderId;

  const storageCylinder = storageCylinders.find(
    (sc) => sc.id === storageCylinderId
  );

  // User has managed to select cylinder that has invalid id from the dropdown menu
  // => programming error
  if (storageCylinder === undefined) {
    throw new Error('Storage cylinder not found!');
  }

  const gasPriceEurCents = gases.find(
    (price) => price.gasId === storageCylinder.gasId
  )?.priceEurCents;
  const storageCylinderVolume = storageCylinder.volume;

  // Calculate price and consumption when row values change
  useEffect(() => {
    setFieldValue(
      `fillingEventRows.${index}.priceEurCents`,
      formatEurCentsToEur(
        calculateGasConsumption(
          storageCylinderVolume,
          startPressure ?? 0,
          endPressure ?? 0
        ) * (gasPriceEurCents ?? 0)
      )
    );
  }, [
    startPressure,
    endPressure,
    storageCylinderId,
    setFieldValue,
    index,
    gasPriceEurCents,
    storageCylinderVolume,
  ]);
  useEffect(() => {
    setFieldValue(
      `fillingEventRows.${index}.consumption`,
      calculateGasConsumption(
        storageCylinderVolume,
        startPressure ?? 0,
        endPressure ?? 0
      )
    );
  }, [
    startPressure,
    endPressure,
    storageCylinderId,
    setFieldValue,
    index,
    gasPriceEurCents,
    storageCylinderVolume,
  ]);
  return (
    <div>
      <div className="fillingEventGridRow">
        <DropdownMenu
          name={`fillingEventRows.${index}.storageCylinderId`}
          errorText={errors.fillingEventRows?.at(index)?.storageCylinderId}
        >
          {storageCylinders.map((sc) => (
            <option key={sc.id} value={sc.id}>
              {sc.name} (
              {mapGasToName(
                gases.find((gas) => gas.gasId === sc.gasId)?.gasName
              )}
              )
            </option>
          ))}
        </DropdownMenu>
        <TextInput
          name={`fillingEventRows.${index}.startPressure`}
          unit="bar"
          errorText={errors.fillingEventRows?.at(index)?.startPressure}
        />
        <TextInput
          name={`fillingEventRows.${index}.endPressure`}
          unit="bar"
          errorText={errors.fillingEventRows?.at(index)?.endPressure}
        />
        <TextInput
          name={`fillingEventRows.${index}.consumption`}
          disabled
          unit="l"
        />
        <TextInput
          name={`fillingEventRows.${index}.priceEurCents`}
          disabled
          unit="€"
        />
        <IconButton
          className="deleteRowButton"
          icon={<BsTrash />}
          onClick={() =>
            index === 0 && values.fillingEventRows.length === 1
              ? replace(index, {
                  ...EMPTY_FILLING_EVENT_ROW,
                  storageCylinderId: storageCylinders[0].id,
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
              ...EMPTY_FILLING_EVENT_ROW,
              storageCylinderId: storageCylinders[0].id,
            })
          }
          type={ButtonType.button}
          text="Lisää uusi rivi"
        />
      ) : null}
    </div>
  );
};

type FillingTileProps = CommonTileProps & {
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean
  ) => void;
  storageCylinders: StorageCylinder[];
  gases: GasWithPricing[];
};

export const FillingTile: React.FC<FillingTileProps> = ({
  errors,
  setFieldValue,
  values,
  storageCylinders,
  gases,
}) => {
  return (
    <div className="tileWrapper">
      <h2>Täyttö</h2>
      <div className="fillingEventGridRow titleBar">
        <span>Varastopullo</span>
        <span>Lähtöpaine</span>
        <span>Loppupaine</span>
        <span>Kulutus</span>
        <span>Hinta</span>
        <span>Poista</span>
      </div>
      <FieldArray name="fillingEventRows">
        {({ replace, remove, push }) => (
          <>
            {values.fillingEventRows.map((row, index) => (
              <FillingEventRowComponent
                key={`${row.storageCylinderId}-${index}`}
                errors={errors}
                index={index}
                push={push}
                gases={gases}
                remove={remove}
                replace={replace}
                setFieldValue={setFieldValue}
                storageCylinders={storageCylinders}
                values={values}
              />
            ))}
          </>
        )}
      </FieldArray>
    </div>
  );
};
