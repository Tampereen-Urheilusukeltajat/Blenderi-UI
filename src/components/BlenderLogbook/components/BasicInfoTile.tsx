import { DivingCylinderSet } from '../../../interfaces/DivingCylinderSet';
import { DropdownMenu, TextInput } from '../../common/Inputs';
import React from 'react';
import {
  AvailableGasses,
  AvailableMixtureCompositions,
} from '../../../lib/utils';
import { CommonTileProps } from '../BlenderLogbook';

type BasicInfoTileProps = CommonTileProps & {
  divingCylinderSets: DivingCylinderSet[];
};

export const BasicInfoTile: React.FC<BasicInfoTileProps> = ({
  divingCylinderSets,
  errors,
  values,
}) => (
  <div>
    <h2>Esitiedot</h2>
    <div className="d-flex flex-column gap-3">
      <div className="d-flex gap-3 flex-wrap">
        <DropdownMenu
          disabled={values.userConfirm}
          errorText={errors.divingCylinderSetId}
          label="Pullosetti"
          name="divingCylinderSetId"
          type="select"
        >
          <optgroup label="Omat pullot">
            {divingCylinderSets.map((dcs) => (
              <option key={dcs.id} value={dcs.id}>
                {/* If multiple cylinders with the same name are found, also add serial number to the name */}
                {dcs.name}
                {divingCylinderSets.filter((e) => e.name === dcs.name).length >
                1
                  ? ` (${dcs.cylinders[0].serialNumber})`
                  : ''}
              </option>
            ))}
          </optgroup>
        </DropdownMenu>
        <TextInput
          disabled={values.userConfirm}
          errorText={errors.additionalInformation}
          label="Lisätiedot"
          name="additionalInformation"
        />
      </div>

      <div className="d-flex gap-3 flex-wrap">
        <DropdownMenu
          disabled={values.userConfirm}
          name="gasMixture"
          label="Kaasuseos"
        >
          {AvailableMixtureCompositions.map((mix) => (
            <option key={mix.id} value={mix.id}>
              {mix.id}
            </option>
          ))}
        </DropdownMenu>

        <TextInput
          disabled={
            values.userConfirm ||
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
            values.userConfirm ||
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
    </div>
  </div>
);
