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
import {
  ButtonType,
  ElementButton,
  PrimaryButton,
} from '../../common/Button/Buttons';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import { CommonTileProps, emptyFillingRow } from './BlenderFillingEventForm';
import styles from './FillingTile.module.scss';

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
  lastItem: boolean;
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
  lastItem,
}) => {
  const startPressure = values.fillingEventRows.at(index)?.startPressure;
  const endPressure = values.fillingEventRows.at(index)?.endPressure;
  const storageCylinderId =
    values.fillingEventRows.at(index)?.storageCylinderId;

  const storageCylinder = storageCylinders.find(
    (sc) => sc.id === storageCylinderId
  );

  const gasPriceEurCents = gases.find(
    (price) => price.gasId === storageCylinder?.gasId
  )?.priceEurCents;
  const storageCylinderVolume = storageCylinder?.volume;

  // Calculate price and consumption when row values change
  useEffect(() => {
    setFieldValue(
      `fillingEventRows.${index}.priceEurCents`,
      formatEurCentsToEur(
        calculateGasConsumption(
          storageCylinderVolume ?? 0,
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
        storageCylinderVolume ?? 0,
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
      <div className={styles.fillingRow}>
        <div className={styles.deleteButtonWrapper}>
          <ElementButton
            disabled={values.userConfirm}
            element={<BsTrash />}
            onClick={() =>
              index === 0 && values.fillingEventRows.length === 1
                ? replace(index, {
                    ...emptyFillingRow(),
                  })
                : remove(index)
            }
          />
        </div>

        <DropdownMenu
          disabled={values.userConfirm}
          label="Varastopullo"
          name={`fillingEventRows.${index}.storageCylinderId`}
          errorText={errors.fillingEventRows?.at(index)?.storageCylinderId}
        >
          {storageCylinders.map((sc) => (
            <option
              disabled={values.fillingEventRows.some(
                (row) => row.storageCylinderId === sc.id
              )}
              key={sc.id}
              value={sc.id}
            >
              {sc.name} (
              {mapGasToName(
                gases.find((gas) => gas.gasId === sc.gasId)?.gasName
              )}
              )
            </option>
          ))}
        </DropdownMenu>
        <TextInput
          disabled={values.userConfirm}
          label="Lähtöpaine"
          name={`fillingEventRows.${index}.startPressure`}
          unit="bar"
          errorText={errors.fillingEventRows?.at(index)?.startPressure}
        />
        <TextInput
          disabled={values.userConfirm}
          label="Loppupaine"
          name={`fillingEventRows.${index}.endPressure`}
          unit="bar"
          errorText={errors.fillingEventRows?.at(index)?.endPressure}
        />
        <TextInput
          label="Kulutus"
          name={`fillingEventRows.${index}.consumption`}
          disabled
          unit="l"
        />
        <TextInput
          label="Hinta"
          name={`fillingEventRows.${index}.priceEurCents`}
          disabled
          unit="€"
        />
      </div>
      {lastItem ? (
        <div className={styles.addRow}>
          <PrimaryButton
            disabled={values.userConfirm}
            onClick={() =>
              push({
                ...emptyFillingRow(),
              })
            }
            type={ButtonType.button}
            text="Lisää uusi rivi"
          />
        </div>
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
    <div className="pt-3 pb-3 border-bottom">
      <h2>Täyttö</h2>
      <FieldArray name="fillingEventRows">
        {({ replace, remove, push }) => (
          <>
            {values.fillingEventRows.map((row, index) => (
              <FillingEventRowComponent
                key={row.uniqueId}
                errors={errors}
                index={index}
                push={push}
                gases={gases}
                lastItem={values.fillingEventRows.length === index + 1}
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
