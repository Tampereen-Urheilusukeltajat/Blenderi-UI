import React, { useMemo } from 'react';
import { PaymentEvent, PaymentStatus } from '../../lib/apiRequests/payment';
import {
  CommonTable,
  TableColumn,
  TableRow,
} from '../common/Table/CommonTable';
import format from 'date-fns/format';
import compareDesc from 'date-fns/compareDesc';
import { formatEurCentsToEur } from '../../lib/utils';

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
  {
    shortTitle: '€',
    title: 'Hinta €',
  },
  {
    shortTitle: '',
    title: 'Toiminnot',
  },
];

const getDisplayTextForPaymentEvent = (status: PaymentStatus): string => {
  switch (status) {
    case PaymentStatus.completed:
      return 'Maksu suoritettu onnistuneesti';
    case PaymentStatus.created:
      return 'Maksutapahtuma on luotu, mutta maksua ei ole vielä suoritettu';
    case PaymentStatus.failed:
      return 'Maksutapahtuma epäonnistui. Yritä uudelleen';
    case PaymentStatus.inProgress:
      return 'Maksutapahtuma on vielä kesken. Tarkista tilanne uudestaan hetken kulttua';
  }
};

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
              format(new Date(pe.createdAt), 'dd.MM.yy - HH:mm'),
              getDisplayTextForPaymentEvent(pe.status),
              formatEurCentsToEur(pe.totalAmountEurCents) ?? 0,
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
