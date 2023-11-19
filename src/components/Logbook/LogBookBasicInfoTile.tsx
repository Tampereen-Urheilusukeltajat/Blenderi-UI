import { LogbookCommonTileProps } from '../BlenderLogbook/NewBlenderFillingEvent';
import { TextInput } from '../common/Inputs';
import React from 'react';

type LogbookBasicInfoTileProps = LogbookCommonTileProps;

export const LogbookBasicInfoTile: React.FC<LogbookBasicInfoTileProps> = ({
  errors,
  values,
}): JSX.Element => {
  return (
    <div>
      <h2>Esitiedot</h2>
      <div className="d-flex gap-3">
        <TextInput
          name="gasMixture"
          label="Kaasu"
          disabled
          placeholder="Paineilma"
        />
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
