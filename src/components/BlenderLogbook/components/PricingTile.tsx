import { formatEurCentsToEur, mapGasToName } from '../../../lib/utils';
import React from 'react';
import { GasWithPricing } from '../../../lib/queries/gasQuery';
import { CommonTileProps } from './BlenderFillingEventForm';

type PricingTileProps = CommonTileProps & {
  gases: GasWithPricing[];
};

export const PricingTile: React.FC<PricingTileProps> = ({ gases }) => (
  <div className="tileWrapper pricingTile">
    <h2>Hinnasto</h2>
    {gases.map((gas) => (
      <div key={`${gas.gasId}`} className="pricingGridRow">
        <span>{mapGasToName(gas.gasName)}</span>
        <span>{formatEurCentsToEur(gas.priceEurCents)}</span>
        <span>€/l</span>
      </div>
    ))}
  </div>
);
