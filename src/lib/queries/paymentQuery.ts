import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { type UseMutation, type UseQuery } from './common';
import { PAYMENT_EVENTS, PAYMENT_EVENT_QUERY_KEY } from './queryKeys';
import {
  type PaymentEvent,
  createPaymentEvent,
  getPaymentEvent,
  getPaymentEvents,
} from '../apiRequests/payment';
import { useEffect } from 'react';

export const usePaymentEventQuery = (
  paymentEventId?: string,
): UseQuery<PaymentEvent> => {
  const { isLoading, data, isError } = useQuery({
    enabled: !!paymentEventId,
    queryKey: PAYMENT_EVENT_QUERY_KEY(paymentEventId ?? ''),
    queryFn: async () => getPaymentEvent(paymentEventId ?? ''),
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Maksutapahtuman hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

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
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Maksutapahtumien hakeminen epäonnistui. Yritä uudelleen.');
    }
  }, [isError]);

  return {
    data,
    isLoading,
    isError,
  };
};

export const useCreatePaymentEventMutation = (): UseMutation<
  PaymentEvent,
  void
> => {
  const { isPending, data, isError, mutate } = useMutation({
    mutationFn: async () => createPaymentEvent(),
    onError: () => {
      toast.error('Maksutapahtuman luominen epäonnistui. Yritä uudelleen.');
    },
    retry: 0,
  });

  return {
    mutate,
    data,
    isPending,
    isError,
  };
};
