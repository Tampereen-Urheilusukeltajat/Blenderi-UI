import React, { useMemo } from 'react';
import { PaymentEvent } from '../../lib/apiRequests/payment';
import {
  CommonTable,
  TableColumn,
  TableRow,
} from '../common/Table/CommonTable';
import format from 'date-fns/format';
import { compareDesc } from 'date-fns';

type PaymentsListProps = {
  paymentEvents: PaymentEvent[];
};

const PAYMENT_EVENTS_COLUMNS: TableColumn[] = [
  {
    shortTitle: 'Pvm',
    title: 'Päivämäärä',
  },
  {
    shortTitle: 'Tila',
    title: 'Tila',
  },
];

export const PaymentsList: React.FC<PaymentsListProps> = ({
  paymentEvents,
}) => {
  const paymentEventTableRows = useMemo(
    () =>
      paymentEvents
        .sort((a, b) =>
          compareDesc(new Date(a.createdAt), new Date(b.createdAt))
        )
        .map(
          (pe): TableRow => ({
            id: pe.id,
            mainRow: [
              format(new Date(pe.createdAt), 'dd.MM.yy hh:ss'),
              pe.status,
            ],
          })
        ),
    [paymentEvents]
  );

  return (
    <div>
      <h1>Käynnissä olevat ja menneet maksutapahtumat</h1>
      <CommonTable
        columns={PAYMENT_EVENTS_COLUMNS}
        rows={paymentEventTableRows}
      />
    </div>
  );
};
