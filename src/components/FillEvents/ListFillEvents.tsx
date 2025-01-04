import { format } from 'date-fns';
import { useFillEventQuery } from '../../lib/queries/FillEventQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import {
  CommonTable,
  type TableColumn,
  type TableRow,
} from '../common/Table/CommonTable';
import { useMemo } from 'react';

const FILL_EVENT_COLUMNS: TableColumn[] = [
  {
    title: 'Päivämäärä',
    shortTitle: 'Pvm',
  },
  {
    title: 'Pullosetti',
    shortTitle: 'PS',
  },
  {
    title: 'Kaasuseos',
    shortTitle: 'KS',
  },
  {
    title: 'Kompressori',
    shortTitle: 'K',
  },
  {
    title: 'Lisätiedot',
    shortTitle: 'LT',
  },
  {
    title: 'Hinta (€)',
    shortTitle: '€',
  },
];

const dateFormatter = (date: string): string =>
  format(new Date(date), 'dd.MM.yy HH:mm');

export const ListFillEvents = (): JSX.Element => {
  const { data: fillEvents } = useFillEventQuery();
  const rows: TableRow[] = useMemo(
    () =>
      fillEvents
        ?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((fillEvent) => ({
          id: fillEvent.id,
          mainRow: [
            dateFormatter(fillEvent.createdAt),
            fillEvent.cylinderSetName,
            fillEvent.gasMixture,
            fillEvent.compressorName ?? '',
            fillEvent.description,
            formatEurCentsToEur(fillEvent.price),
          ],
        })) ?? [],
    [fillEvents],
  );
  return (
    <div>
      <div className="d-flex flex-row justify-content-between pb-4">
        <h1>Täyttöhistoria</h1>
        <h2>
          Täyttöjen hinta yhteensä:{' '}
          {formatEurCentsToEur(
            fillEvents?.reduce((acc, fillEvent) => acc + fillEvent.price, 0) ??
              0,
          )}{' '}
          €
        </h2>
      </div>
      <CommonTable columns={FILL_EVENT_COLUMNS} rows={rows} />
    </div>
  );
};
