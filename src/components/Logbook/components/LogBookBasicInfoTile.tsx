import { Compressor } from '../../../lib/queries/compressorQuery';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import React from 'react';

export type LogbookFillingEventRow = {
  divingCylinderSet: string;
  uniqueId: string;
};

type LogbookFillingEventBasicInfo = {
  additionalInformation: string;
  gasMixture: string;
  userConfirm: boolean;
};

type LogbookFormFields = LogbookFillingEventBasicInfo & {
  fillingEventRows: LogbookFillingEventRow[];
};

export type LogbookCommonTileProps = {
  // TODO FIX THIS
  // Casting as any because array errors wouldn't be otherwise correctly typed
  // It might be possible to fix this in the future with bit more time
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any;
  values: LogbookFormFields;
};

type LogbookBasicInfoTileProps = LogbookCommonTileProps & {
  compressors: Compressor[];
};

export const LogbookBasicInfoTile: React.FC<LogbookBasicInfoTileProps> = ({
  errors,
  values,
  compressors,
}): JSX.Element => {
  return (
    <div className="pb-3 border-bottom">
      <h2>Esitiedot</h2>
      <div className="d-flex gap-3">
        <TextInput
          name="gasMixture"
          label="Kaasu"
          disabled
          placeholder="Paineilma"
        />
        <DropdownMenu
          name="compressorId"
          label="Kompressori"
          disabled={values.userConfirm}
          errorText={errors.compressorId}
        >
          {compressors.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </DropdownMenu>
        <TextInput
          disabled={values.userConfirm}
          errorText={errors.additionalInformation}
          label="Lisätiedot"
          name="additionalInformation"
        />
      </div>
    </div>
  );
};
