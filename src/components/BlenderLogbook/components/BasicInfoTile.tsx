import { DivingCylinderSet } from '../../../interfaces/DivingCylinderSet';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import { CommonTileProps } from '../NewBlenderFillingEvent';
import React from 'react';
import {
  AvailableGasses,
  AvailableMixtureCompositions,
} from '../../../lib/utils';

type BasicInfoTileProps = CommonTileProps & {
  divingCylinderSets: DivingCylinderSet[];
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
              {/* If multiple cylinders with the same name are found, also add serial number to the name */}
              {dcs.name}{' '}
              {divingCylinderSets.filter((e) => e.name === dcs.name).length > 1
                ? `(${dcs.cylinders[0].serialNumber})`
                : ''}
            </option>
          ))}
        </optgroup>
        {/* Disable for now */}
        {/* <optgroup label="Muut">
          <option value="guestDivingCylinder">Lisää tilapäinen pullo...</option>
        </optgroup> */}
      </DropdownMenu>
      <DropdownMenu name="gasMixture" label="Kaasuseos">
        {AvailableMixtureCompositions.map((mix) => (
          <option key={mix.id} value={mix.id}>
            {mix.id}
          </option>
        ))}
      </DropdownMenu>

      <TextInput
        disabled={
          AvailableMixtureCompositions.find(
            (m) => m.id === values.gasMixture
          )?.components.includes(AvailableGasses.oxygen) === false
        }
        errorText={errors.oxygenPercentage}
        label="Happi %"
        name="oxygenPercentage"
        unit="%"
      />
      <TextInput
        disabled={
          AvailableMixtureCompositions.find(
            (m) => m.id === values.gasMixture
          )?.components.includes(AvailableGasses.helium) === false
        }
        errorText={errors.heliumPercentage}
        label="Helium %"
        name="heliumPercentage"
        unit="%"
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
          label="Koko"
          name="guestDivingCylinder.volume"
          unit="l"
        />
        <TextInput
          errorText={errors.guestDivingCylinder?.maxPressure}
          label="Maksimipaine"
          name="guestDivingCylinder.maxPressure"
          unit="bar"
        />
      </div>
    ) : null}
    <div>
      <TextInput
        errorText={errors.additionalInformation}
        label="Lisätiedot"
        name="additionalInformation"
      />
    </div>
  </div>
);
