import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { UseQuery } from './common';
import { PAYMENT_EVENTS, PAYMENT_EVENT_QUERY_KEY } from './queryKeys';
import {
  PaymentEvent,
  createPaymentEvent,
  getPaymentEvent,
  getPaymentEvents,
} from '../apiRequests/payment';

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

export const usePaymentEventsQuery = (): UseQuery<PaymentEvent[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: PAYMENT_EVENTS,
    queryFn: async () => getPaymentEvents(),
    onError: () => {
      toast.error('Maksutapahtumien hakeminen epäonnistui. Yritä uudelleen.');
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

export const useCreatePaymentEventMutation = (): UseQuery<PaymentEvent> => {
  const { isLoading, data, isError } = useMutation({
    mutationFn: async () => createPaymentEvent(),
    onError: () => {
      toast.error('Maksutapahtuman luominen epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
