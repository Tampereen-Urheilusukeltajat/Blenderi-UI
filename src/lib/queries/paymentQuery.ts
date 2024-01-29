import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseQuery } from './common';
import { PAYMENT_EVENT_QUERY_KEY } from './queryKeys';
import { PaymentEvent, getPaymentEvent } from '../apiRequests/payment';

export const usePaymentEventQuery = (
  paymentEventId?: string
): UseQuery<PaymentEvent> => {
  const { isLoading, data, isError } = useQuery({
    enabled: !!paymentEventId,
    queryKey: PAYMENT_EVENT_QUERY_KEY(paymentEventId ?? ''),
    queryFn: async () => getPaymentEvent(paymentEventId ?? ''),
    onError: () => {
      toast.error('Maksutapahtuman hakeminen epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
