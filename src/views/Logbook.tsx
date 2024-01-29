import { useMemo } from 'react';
import { NewFillingEvent } from '../components/Logbook/Logbook';
import { useCompressorQuery } from '../lib/queries/compressorQuery';

export const Logbook = (): JSX.Element => {
  const { data: allCompressors, isError } = useCompressorQuery();

  const compressors = useMemo(
    () => allCompressors?.filter((c) => c.airOnly) ?? [],
    [allCompressors]
  );

  return (
    <>
      {isError && (
        <div>
          Kompuroiden lataaminen epäonnistui. Yritä ladata sivu uudestaan.
        </div>
      )}
      {allCompressors && !isError && (
        <NewFillingEvent compressors={compressors} />
      )}
    </>
  );
};
