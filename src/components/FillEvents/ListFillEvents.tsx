import { useFillEventQuery } from '../../lib/queries/FillEventQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import {
  CommonTable,
  TableColumn,
  TableRow,
} from '../common/Table/CommonTable';
import { useMemo } from 'react';

const FILL_EVENT_COLUMNS: TableColumn[] = [
  {
    title: 'Päivämäärä',
  },
  {
    title: 'Pullosetti',
  },
  {
    title: 'Kaasuseos',
  },
  {
    title: 'Lisätiedot',
  },
  {
    title: 'Hinta (€)',
  },
];

export const ListFillEvents = (): JSX.Element => {
  const { data: fillEvents } = useFillEventQuery();
  const rows: TableRow[] = useMemo(
    () =>
      fillEvents?.map((fillEvent) => ({
        id: fillEvent.id,
        mainRow: [
          fillEvent.createdAt,
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
      <div className="d-flex flex-row justify-content-between">
        <h1 className="pb-4">Täyttöhistoria</h1>
        <div className="d-flex flex-column align-items-center">
          <h2>Täyttöjen hinta yhteensä</h2>
          <h3>
            {formatEurCentsToEur(
              fillEvents?.reduce(
                (acc, fillEvent) => acc + fillEvent.price,
                0
              ) ?? 0
            )}{' '}
            €
          </h3>
        </div>
      </div>
      <CommonTable columns={FILL_EVENT_COLUMNS} rows={rows} />
    </div>
  );
};
