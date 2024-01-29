import format from 'date-fns/format';
import { formatEurCentsToEur } from '../../lib/utils';
import {
  CommonTable,
  TableColumn,
  TableRow,
} from '../common/Table/CommonTable';
import { useMemo } from 'react';
import { FillEvent } from '../../interfaces/FillEvent';

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
    title: 'Lisätiedot',
    shortTitle: 'LT',
  },
  {
    title: 'Hinta (€)',
    shortTitle: '€',
  },
];

const dateFormatter = (date: string): string =>
  format(new Date(date), 'd.MM.yy');

type ListFillEventsProps = {
  fillEvents: FillEvent[];
};

export const ListFillEvents: React.FC<ListFillEventsProps> = ({
  fillEvents,
}) => {
  const rows: TableRow[] = useMemo(
    () =>
      fillEvents
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((fillEvent) => ({
          id: fillEvent.id,
          mainRow: [
            dateFormatter(fillEvent.createdAt),
            fillEvent.cylinderSetName,
            fillEvent.gasMixture,
            fillEvent.description,
            formatEurCentsToEur(fillEvent.price),
          ],
        })) ?? [],
    [fillEvents]
  );
  return (
    <div>
      <div className="d-flex flex-row justify-content-between pb-4">
        <h1>Täyttöhistoria</h1>
        <h2>
          Täyttöjen hinta yhteensä:{' '}
          {formatEurCentsToEur(
            fillEvents?.reduce((acc, fillEvent) => acc + fillEvent.price, 0) ??
              0
          )}{' '}
          €
        </h2>
      </div>
      <CommonTable columns={FILL_EVENT_COLUMNS} rows={rows} />
    </div>
  );
};
