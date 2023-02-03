import { formatEurCentsToEur } from '../../../lib/utils';
import { CommonTileProps, GasPrice } from '../NewBlenderFillingEvent';
import React from 'react';

type PricingTileProps = CommonTileProps & {
  prices: GasPrice[];
};

export const PricingTile: React.FC<PricingTileProps> = ({ prices }) => (
  <div className="tileWrapper pricingTile">
    <h2>Hinnasto</h2>
    {prices.map((gasPrice) => (
      <div key={`${gasPrice.gas}`} className="pricingGridRow">
        <span>{gasPrice.name}</span>
        <span>{formatEurCentsToEur(gasPrice.priceEurCents)}</span>
        <span>€/l</span>
      </div>
    ))}
  </div>
);
