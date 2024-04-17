import { formatEurCentsToEur, mapGasToName } from '../../../lib/utils';
import React from 'react';
import { type GasWithPricing } from '../../../lib/queries/gasQuery';
import styles from './PricingTile.module.scss';
import { type CommonTileProps } from '../BlenderLogbook';

type PricingTileProps = CommonTileProps & {
  gases: GasWithPricing[];
};

export const PricingTile: React.FC<PricingTileProps> = ({ gases }) => (
  <div className={styles.content}>
    <h2>Hinnasto (€ / l)</h2>
    {gases.map((gas) => (
      <div key={`${gas.gasId}`} className={styles.priceRow}>
        <span>{mapGasToName(gas.gasName)}:</span>
        <span>{formatEurCentsToEur(gas.priceEurCents)}</span>
      </div>
    ))}
  </div>
);
