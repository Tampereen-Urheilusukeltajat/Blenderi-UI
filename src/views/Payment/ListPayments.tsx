import { useMemo } from 'react';
import { NewPaymentEvent } from '../../components/Payments/NewPaymentEvent';
import { PaymentsList } from '../../components/Payments/PaymentsList';
import { useUnpaidFillEventsQuery } from '../../lib/queries/fillEventQuery';
import { usePaymentEventsQuery } from '../../lib/queries/paymentQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import compareAsc from 'date-fns/compareAsc';

export const ListPayments: React.FC = () => {
  const { isError: isPaymentEventsError, data: paymentEvents } =
    usePaymentEventsQuery();
  const { isError: isUnpaidFillEventsError, data: unpaidFillEvents } =
    useUnpaidFillEventsQuery();
  const anyErrors = isPaymentEventsError || isUnpaidFillEventsError;

  const sortedUnpaidFillEvents = useMemo(
    () =>
      unpaidFillEvents?.fillEvents.sort((a, b) =>
        compareAsc(new Date(a.createdAt), new Date(b.createdAt))
      ),
    [unpaidFillEvents]
  );

  // Do not allow creating payment event if the amount due is less than 10 €
  const disableCreatingNewPaymentEvents =
    (unpaidFillEvents?.totalPriceInEurCents ?? 0) < 1000;

  return (
    <>
      {anyErrors && (
        <div>
          Vaadittujen tietojen lataaminen epäonnistui. Yritä ladata sivu
          uudestaan.
        </div>
      )}
      {unpaidFillEvents && sortedUnpaidFillEvents && (
        <NewPaymentEvent
          creatingNewPaymentEventDisabled={disableCreatingNewPaymentEvents}
          firstPaymentEventDate={new Date(sortedUnpaidFillEvents[0].createdAt)}
          lastPaymentEventDate={
            new Date(sortedUnpaidFillEvents.reverse()[0].createdAt)
          }
          totalFillEvents={unpaidFillEvents.fillEvents.length}
          totalPrice={formatEurCentsToEur(
            unpaidFillEvents.totalPriceInEurCents
          )}
        />
      )}
      {paymentEvents && <PaymentsList paymentEvents={paymentEvents} />}
    </>
  );
};
