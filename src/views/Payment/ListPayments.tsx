import { useCallback, useEffect, useMemo } from 'react';
import { NewPaymentEvent } from '../../components/Payments/NewPaymentEvent';
import { PaymentsList } from '../../components/Payments/PaymentsList';
import { useUnpaidFillEventsQuery } from '../../lib/queries/fillEventQuery';
import {
  useCreatePaymentEventMutation,
  usePaymentEventsQuery,
} from '../../lib/queries/paymentQuery';
import { formatEurCentsToEur } from '../../lib/utils';
import { useNavigate } from 'react-router-dom';
import { compareAsc } from 'date-fns';

export const ListPayments: React.FC = () => {
  const navigate = useNavigate();
  const { isError: isPaymentEventsError, data: paymentEvents } =
    usePaymentEventsQuery();
  const { isError: isUnpaidFillEventsError, data: unpaidFillEvents } =
    useUnpaidFillEventsQuery();
  const anyErrors = isPaymentEventsError || isUnpaidFillEventsError;
  const {
    mutate: createNewPaymentEvent,
    data: newPaymentEvent,
    isPending: isCreatingNewPaymentEventLoading,
  } = useCreatePaymentEventMutation();

  const sortedUnpaidFillEvents = useMemo(
    () =>
      unpaidFillEvents?.fillEvents.sort((a, b) =>
        compareAsc(new Date(a.createdAt), new Date(b.createdAt)),
      ) ?? [],
    [unpaidFillEvents],
  );

  // Do not allow creating payment event if the amount due is less than 10 €
  const disableCreatingNewPaymentEvents =
    (unpaidFillEvents?.totalPriceInEurCents ?? 0) < 1000 ||
    isCreatingNewPaymentEventLoading;

  const handleNewPaymentButtonClick = useCallback(() => {
    createNewPaymentEvent(undefined);
  }, [createNewPaymentEvent]);

  // After creating payment event, redirect user to the payment view
  useEffect(() => {
    if (newPaymentEvent) {
      navigate(`/payment/${newPaymentEvent.id}/pay`);
    }
  }, [navigate, newPaymentEvent]);

  return (
    <>
      {anyErrors && (
        <div>
          Vaadittujen tietojen lataaminen epäonnistui. Yritä ladata sivu
          uudestaan.
        </div>
      )}
      {unpaidFillEvents && (
        <NewPaymentEvent
          creatingNewPaymentEventDisabled={disableCreatingNewPaymentEvents}
          totalFillEvents={unpaidFillEvents.fillEvents.length}
          firstPaymentEventDate={
            sortedUnpaidFillEvents[0]?.createdAt
              ? new Date(sortedUnpaidFillEvents[0].createdAt)
              : undefined
          }
          lastPaymentEventDate={
            sortedUnpaidFillEvents[0]?.createdAt
              ? new Date(sortedUnpaidFillEvents.reverse()[0].createdAt)
              : undefined
          }
          totalPrice={formatEurCentsToEur(
            unpaidFillEvents.totalPriceInEurCents,
          )}
          onNewPaymentEventButtonClick={handleNewPaymentButtonClick}
        />
      )}
      {paymentEvents && <PaymentsList paymentEvents={paymentEvents} />}
    </>
  );
};
