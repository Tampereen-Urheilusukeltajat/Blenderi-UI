import { useMemo } from 'react';
import { NewBlenderFillingEvent } from '../components/BlenderLogbook/BlenderLogbook';
import { useCompressorQuery } from '../lib/queries/compressorQuery';
import { useGasesQuery } from '../lib/queries/gasQuery';
import { useStorageCylinderQuery } from '../lib/queries/storageCylinderQuery';
import { getUserIdFromAccessToken } from '../lib/utils';
import { useDivingCylinderQuery } from '../lib/queries/divingCylinderQuery';

export const BlenderLogbook = (): JSX.Element => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);

  const { data: compressors, isError: isCompressorError } =
    useCompressorQuery();
  const { data: storageCylinders, isError: isStorageCylinderError } =
    useStorageCylinderQuery();
  const { data: gases, isError: isGasesError } = useGasesQuery();
  const { data: divingCylinderSets, isError: isDivingCylindersError } =
    useDivingCylinderQuery(userId);

  const requiredDataLoaded =
    (storageCylinders &&
      storageCylinders.length > 0 &&
      gases &&
      gases.length > 0 &&
      divingCylinderSets &&
      divingCylinderSets.length > 0 &&
      compressors &&
      compressors.length > 0) ??
    false;

  const anyErrors =
    isCompressorError ||
    isStorageCylinderError ||
    isGasesError ||
    isDivingCylindersError;

  return (
    <>
      {anyErrors && (
        <div>
          Vaadittujen tietojen lataaminen epäonnistui. Yritä ladata sivu
          uudestaan.
        </div>
      )}
      {requiredDataLoaded && (
        <NewBlenderFillingEvent
          compressors={compressors ?? []}
          divingCylinderSets={divingCylinderSets ?? []}
          gases={gases ?? []}
          storageCylinders={storageCylinders ?? []}
        />
      )}
    </>
  );
};
