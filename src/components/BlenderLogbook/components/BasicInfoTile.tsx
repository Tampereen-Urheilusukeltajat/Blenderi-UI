import { DivingCylinderSet } from '../../../lib/apiRequests/divingCylinderSetRequests';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import { CommonTileProps } from '../NewBlenderFillingEvent';
import React from 'react';

type BasicInfoTileProps = CommonTileProps & {
  divingCylinderSets: Array<Pick<DivingCylinderSet, 'name' | 'id'>>;
};

export const BasicInfoTile: React.FC<BasicInfoTileProps> = ({
  divingCylinderSets,
  errors,
  values,
}) => (
  <div className="tileWrapper">
    <h2>Esitiedot</h2>
    <div className="basicInfoGridRow">
      <DropdownMenu
        errorText={errors.divingCylinderSetId}
        label="Pullosetti"
        name="divingCylinderSetId"
        type="select"
      >
        <optgroup label="Omat pullot">
          {divingCylinderSets.map((dcs) => (
            <option key={dcs.id} value={dcs.id}>
              {dcs.name}
            </option>
          ))}
        </optgroup>
        <optgroup label="Muut">
          <option value="guestDivingCylinder">Lisää tilapäinen pullo...</option>
        </optgroup>
      </DropdownMenu>
      <TextInput
        errorText={errors.gasMixture}
        label="Kaasuseos"
        placeholder="Esim. EAN32"
        name="gasMixture"
      />
      <TextInput
        errorText={errors.additionalInformation}
        label="Lisätiedot"
        name="additionalInformation"
      />
    </div>
    {values.divingCylinderSetId === 'guestDivingCylinder' ? (
      <div className="basicInfoGridRow">
        <TextInput
          errorText={errors.guestDivingCylinder?.inspectionYear}
          label="Pullon katsastusvuosi"
          name="guestDivingCylinder.inspectionYear"
        />
        <TextInput
          errorText={errors.guestDivingCylinder?.volume}
          label="Pullon koko"
          name="guestDivingCylinder.volume"
          unit="l"
        />
        <TextInput
          errorText={errors.guestDivingCylinder?.maxPressure}
          label="Pullon maksimipaine"
          name="guestDivingCylinder.maxPressure"
          unit="bar"
        />
      </div>
    ) : null}
  </div>
);
