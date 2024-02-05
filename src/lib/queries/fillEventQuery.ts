import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  getFillEvents,
  getUnpaidFillEvents,
  postFillEvent,
} from '../apiRequests/fillEventRequests';
import {
  FillEvent,
  CreatedFillEvent,
  NewFillEvent,
  UnpaidFillEventsResponse,
} from '../../interfaces/FillEvent';
import { UseQuery } from './common';
import {
  FILL_EVENT_QUERY_KEY,
  UNPAID_FILL_EVENTS_QUERY_KEY,
} from './queryKeys';

export const useFillEventQuery = (): UseQuery<FillEvent[]> => {
  const { isLoading, data, isError } = useQuery({
    queryKey: FILL_EVENT_QUERY_KEY,
    queryFn: async () => getFillEvents(),
    onError: () => {
      toast.error('Täyttötapahtumien hakeminen epäonnistui. Yritä uudelleen.');
    },
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export const useNewFillEventQuery = (
  payload: NewFillEvent
): UseQuery<CreatedFillEvent> => {
  const { isLoading, data, isError } = useQuery({
    queryFn: async () => postFillEvent(payload),
    onError: () => {
      toast.error(
        'Täyttötapahtuman tallentaminen epäonnistui. Yritä uudelleen.'
      );
    },
    retry: 1,
  });

  return {
    data,
    isLoading,
    isError,
  };
};

export const useUnpaidFillEventsQuery =
  (): UseQuery<UnpaidFillEventsResponse> => {
    const { isLoading, data, isError } = useQuery({
      queryKey: UNPAID_FILL_EVENTS_QUERY_KEY,
      queryFn: async () => getUnpaidFillEvents(),
      onError: () => {
        toast.error(
          'Maksamattomien täyttötapahtumien hakeminen epäonnistui. Yritä uudelleen.'
        );
      },
      retry: 1,
      refetchOnWindowFocus: false,
    });

    return {
      data,
      isLoading,
      isError,
    };
  };
