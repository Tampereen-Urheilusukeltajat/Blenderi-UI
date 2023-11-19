import React, { useMemo } from 'react';
import { useStorageCylinderQuery } from '../../lib/queries/storageCylinderQuery';
import { useGasesQuery } from '../../lib/queries/gasQuery';
import { BlenderFillingEventForm } from './components/BlenderFillingEventForm';
import { getUserIdFromAccessToken } from '../../lib/utils';
import { useDivingCylinderQuery } from '../../lib/queries/divingCylinderQuery';

type NewFillingEventProps = Record<string, never>;

export const NewBlenderFillingEvent: React.FC<
  NewFillingEventProps
> = (): JSX.Element => {
  const { data: storageCylinders } = useStorageCylinderQuery();

  const { data: gases } = useGasesQuery();

  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const { data: divingCylinderSets } = useDivingCylinderQuery(userId);

  const hasData =
    (storageCylinders &&
      storageCylinders.length > 0 &&
      gases &&
      gases.length > 0 &&
      divingCylinderSets &&
      divingCylinderSets.length > 0) ??
    false;

  return (
    <div>
      <h1 className="pb-4">Luo uusi täyttötapahtuma</h1>
      {hasData ? (
        <BlenderFillingEventForm
          divingCylinderSets={divingCylinderSets ?? []}
          gases={gases ?? []}
          storageCylinders={storageCylinders ?? []}
        />
      ) : (
        <h2>Tietojen hakeminen epäonnistui. Yritä ladata sivu uudelleen.</h2>
      )}
    </div>
  );
};
