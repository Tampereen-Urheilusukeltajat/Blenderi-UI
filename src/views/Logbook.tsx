import { NewFillingEvent } from '../components/Logbook/Logbook';
import { useCompressorQuery } from '../lib/queries/compressorQuery';

export const Logbook = (): JSX.Element => {
  const { data, isError } = useCompressorQuery();

  return (
    <>
      {isError && (
        <div>
          Kompuroiden lataaminen epäonnistui. Yritä ladata sivu uudestaan.
        </div>
      )}
      {data && !isError && <NewFillingEvent compressors={data} />}
    </>
  );
};
