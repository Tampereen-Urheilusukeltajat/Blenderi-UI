import { useMemo } from 'react';
import { NewFillingEvent } from '../components/Logbook/Logbook';
import { useCompressorQuery } from '../lib/queries/compressorQuery';
import { useDivingCylinderQuery } from '../lib/queries/divingCylinderQuery';
import { getUserIdFromAccessToken } from '../lib/utils';

export const Logbook = (): JSX.Element => {
  const userId = useMemo(() => getUserIdFromAccessToken(), []);
  const { data: allCompressors, isError } = useCompressorQuery();

  const compressors = useMemo(
    () => allCompressors?.filter((c) => c.airOnly) ?? [],
    [allCompressors],
  );
  const { data: divingCylinderSets, isError: isDivingCylindersError } =
    useDivingCylinderQuery(userId);

  const anyErrors = isDivingCylindersError || isError;
  const requiredDataLoaded =
    (allCompressors?.length ?? 0) > 0 && (divingCylinderSets?.length ?? 0) > 0;

  return (
    <>
      {anyErrors && (
        <div>
          Vaadittavien tietojen lataaminen epäonnistui. Yritä ladata sivu
          uudestaan.
        </div>
      )}
      {(!divingCylinderSets || divingCylinderSets.length < 1) && (
        <div>
          Sinulla ei ole järjestelmään merkittyä omaa pullosettiä, jota voisi
          täyttää.
        </div>
      )}
      {requiredDataLoaded && !anyErrors && (
        <NewFillingEvent
          compressors={compressors}
          divingCylinderSets={divingCylinderSets ?? []}
        />
      )}
    </>
  );
};
